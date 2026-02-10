<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '~/composables/constants'

const { projects, updateProject, deleteProject } = useApp()

const showProjectModal = ref(false)
const showProgressNoteModal = ref(false)
const selectedProject = ref<Project | null>(null)
const filterStatus = ref<'all' | Project['status']>('all')

const filteredProjects = computed(() => {
  if (filterStatus.value === 'all') {
    return projects.value
  }
  return projects.value.filter(p => p.status === filterStatus.value)
})

const activeProjects = computed(() =>
  filteredProjects.value.filter(p => p.status === 'in-progress' || p.status === 'planning')
)

const completedProjects = computed(() =>
  filteredProjects.value.filter(p => p.status === 'completed')
)

const pausedProjects = computed(() =>
  filteredProjects.value.filter(p => p.status === 'paused')
)

function openProjectDetail(project: Project) {
  selectedProject.value = project
}

function closeProjectDetail() {
  selectedProject.value = null
}

function openAddNote(project: Project) {
  selectedProject.value = project
  showProgressNoteModal.value = true
}

function closeProgressNote() {
  showProgressNoteModal.value = false
  // Keep selectedProject so detail modal stays visible
}

function handleUpdateStatus(projectId: string, status: Project['status']) {
  updateProject(projectId, {
    status,
    completedAt: status === 'completed' ? new Date().toISOString() : undefined
  })
}

function handleDeleteProject(projectId: string) {
  deleteProject(projectId)
}
</script>

<template>
  <div class="projects-view">
    <div class="view-header">
      <h2 class="view-title">Projects</h2>
      <button class="btn btn-primary" @click="showProjectModal = true">
        + New Project
      </button>
    </div>

    <div v-if="projects.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <h3 class="empty-title">No Projects Yet</h3>
      <p class="empty-text">
        Start a project to track longer-term goals with progress notes and detailed instructions.
      </p>
      <button class="btn btn-primary" @click="showProjectModal = true">
        Start Your First Project
      </button>
    </div>

    <template v-else>
      <div class="filter-tabs">
        <button
          :class="['filter-tab', { active: filterStatus === 'all' }]"
          @click="filterStatus = 'all'"
        >
          All ({{ projects.length }})
        </button>
        <button
          :class="['filter-tab', { active: filterStatus === 'in-progress' }]"
          @click="filterStatus = 'in-progress'"
        >
          🔨 Active
        </button>
        <button
          :class="['filter-tab', { active: filterStatus === 'planning' }]"
          @click="filterStatus = 'planning'"
        >
          📝 Planning
        </button>
        <button
          :class="['filter-tab', { active: filterStatus === 'completed' }]"
          @click="filterStatus = 'completed'"
        >
          ✅ Complete
        </button>
      </div>

      <div class="projects-list">
        <div v-if="activeProjects.length > 0 && filterStatus === 'all'">
          <h3 class="projects-section-title">Active Projects</h3>
          <ProjectCard
            v-for="project in activeProjects"
            :key="project.id"
            :project="project"
            @click="openProjectDetail(project)"
          />
        </div>

        <div v-if="pausedProjects.length > 0 && filterStatus === 'all'">
          <h3 class="projects-section-title">Paused Projects</h3>
          <ProjectCard
            v-for="project in pausedProjects"
            :key="project.id"
            :project="project"
            @click="openProjectDetail(project)"
          />
        </div>

        <div v-if="completedProjects.length > 0 && filterStatus === 'all'">
          <h3 class="projects-section-title">Completed Projects</h3>
          <ProjectCard
            v-for="project in completedProjects"
            :key="project.id"
            :project="project"
            @click="openProjectDetail(project)"
          />
        </div>

        <div v-if="filterStatus !== 'all'">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
            @click="openProjectDetail(project)"
          />
        </div>
      </div>
    </template>

    <!-- Modals -->
    <ProjectModal v-if="showProjectModal" @close="showProjectModal = false" />

    <ProjectDetail
      v-if="selectedProject && !showProgressNoteModal"
      :project="selectedProject"
      @close="closeProjectDetail"
      @add-note="openAddNote(selectedProject)"
      @update-status="(status) => handleUpdateStatus(selectedProject!.id, status)"
      @delete="handleDeleteProject(selectedProject.id)"
    />

    <ProgressNoteModal
      v-if="showProgressNoteModal && selectedProject"
      :project-id="selectedProject.id"
      :project-title="selectedProject.title"
      @close="closeProgressNote"
    />
  </div>
</template>
