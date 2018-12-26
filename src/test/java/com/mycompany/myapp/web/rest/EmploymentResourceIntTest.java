package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Application;

import com.mycompany.myapp.domain.Employment;
import com.mycompany.myapp.repository.EmploymentRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EmploymentResource REST controller.
 *
 * @see EmploymentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class EmploymentResourceIntTest {

    private static final String DEFAULT_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_POSITION = "BBBBBBBBBB";

    @Autowired
    private EmploymentRepository employmentRepository;

    @Mock
    private EmploymentRepository employmentRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restEmploymentMockMvc;

    private Employment employment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmploymentResource employmentResource = new EmploymentResource(employmentRepository);
        this.restEmploymentMockMvc = MockMvcBuilders.standaloneSetup(employmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Employment createEntity(EntityManager em) {
        Employment employment = new Employment()
            .position(DEFAULT_POSITION);
        return employment;
    }

    @Before
    public void initTest() {
        employment = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployment() throws Exception {
        int databaseSizeBeforeCreate = employmentRepository.findAll().size();

        // Create the Employment
        restEmploymentMockMvc.perform(post("/api/employments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employment)))
            .andExpect(status().isCreated());

        // Validate the Employment in the database
        List<Employment> employmentList = employmentRepository.findAll();
        assertThat(employmentList).hasSize(databaseSizeBeforeCreate + 1);
        Employment testEmployment = employmentList.get(employmentList.size() - 1);
        assertThat(testEmployment.getPosition()).isEqualTo(DEFAULT_POSITION);
    }

    @Test
    @Transactional
    public void createEmploymentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employmentRepository.findAll().size();

        // Create the Employment with an existing ID
        employment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmploymentMockMvc.perform(post("/api/employments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employment)))
            .andExpect(status().isBadRequest());

        // Validate the Employment in the database
        List<Employment> employmentList = employmentRepository.findAll();
        assertThat(employmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPositionIsRequired() throws Exception {
        int databaseSizeBeforeTest = employmentRepository.findAll().size();
        // set the field null
        employment.setPosition(null);

        // Create the Employment, which fails.

        restEmploymentMockMvc.perform(post("/api/employments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employment)))
            .andExpect(status().isBadRequest());

        List<Employment> employmentList = employmentRepository.findAll();
        assertThat(employmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmployments() throws Exception {
        // Initialize the database
        employmentRepository.saveAndFlush(employment);

        // Get all the employmentList
        restEmploymentMockMvc.perform(get("/api/employments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employment.getId().intValue())))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllEmploymentsWithEagerRelationshipsIsEnabled() throws Exception {
        EmploymentResource employmentResource = new EmploymentResource(employmentRepositoryMock);
        when(employmentRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restEmploymentMockMvc = MockMvcBuilders.standaloneSetup(employmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEmploymentMockMvc.perform(get("/api/employments?eagerload=true"))
        .andExpect(status().isOk());

        verify(employmentRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllEmploymentsWithEagerRelationshipsIsNotEnabled() throws Exception {
        EmploymentResource employmentResource = new EmploymentResource(employmentRepositoryMock);
            when(employmentRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restEmploymentMockMvc = MockMvcBuilders.standaloneSetup(employmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEmploymentMockMvc.perform(get("/api/employments?eagerload=true"))
        .andExpect(status().isOk());

            verify(employmentRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getEmployment() throws Exception {
        // Initialize the database
        employmentRepository.saveAndFlush(employment);

        // Get the employment
        restEmploymentMockMvc.perform(get("/api/employments/{id}", employment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employment.getId().intValue()))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployment() throws Exception {
        // Get the employment
        restEmploymentMockMvc.perform(get("/api/employments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployment() throws Exception {
        // Initialize the database
        employmentRepository.saveAndFlush(employment);

        int databaseSizeBeforeUpdate = employmentRepository.findAll().size();

        // Update the employment
        Employment updatedEmployment = employmentRepository.findById(employment.getId()).get();
        // Disconnect from session so that the updates on updatedEmployment are not directly saved in db
        em.detach(updatedEmployment);
        updatedEmployment
            .position(UPDATED_POSITION);

        restEmploymentMockMvc.perform(put("/api/employments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmployment)))
            .andExpect(status().isOk());

        // Validate the Employment in the database
        List<Employment> employmentList = employmentRepository.findAll();
        assertThat(employmentList).hasSize(databaseSizeBeforeUpdate);
        Employment testEmployment = employmentList.get(employmentList.size() - 1);
        assertThat(testEmployment.getPosition()).isEqualTo(UPDATED_POSITION);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployment() throws Exception {
        int databaseSizeBeforeUpdate = employmentRepository.findAll().size();

        // Create the Employment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmploymentMockMvc.perform(put("/api/employments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employment)))
            .andExpect(status().isBadRequest());

        // Validate the Employment in the database
        List<Employment> employmentList = employmentRepository.findAll();
        assertThat(employmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmployment() throws Exception {
        // Initialize the database
        employmentRepository.saveAndFlush(employment);

        int databaseSizeBeforeDelete = employmentRepository.findAll().size();

        // Get the employment
        restEmploymentMockMvc.perform(delete("/api/employments/{id}", employment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Employment> employmentList = employmentRepository.findAll();
        assertThat(employmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Employment.class);
        Employment employment1 = new Employment();
        employment1.setId(1L);
        Employment employment2 = new Employment();
        employment2.setId(employment1.getId());
        assertThat(employment1).isEqualTo(employment2);
        employment2.setId(2L);
        assertThat(employment1).isNotEqualTo(employment2);
        employment1.setId(null);
        assertThat(employment1).isNotEqualTo(employment2);
    }
}
