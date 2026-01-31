"use server";

import { revalidatePath } from "next/cache";
import { projectSchema, ProjectFormValues } from "@/lib/validations/project";
import { skillSchema, SkillFormValues } from "@/lib/validations/skill";
import { experienceSchema, ExperienceFormValues } from "@/lib/validations/experience";
import { profileSchema, ProfileFormValues } from "@/lib/validations/profile";
import {
    createProjectDB, updateProjectDB, deleteProjectDB,
    createSkillDB, updateSkillDB, deleteSkillDB,
    createExperienceDB, updateExperienceDB, deleteExperienceDB,
    updateProfileDB
} from "@/lib/firebase-db";

// PROJECTS

export async function createProject(data: ProjectFormValues) {
    const validated = projectSchema.parse(data);

    // Tags handling: validated.tags is string (from form input)
    // We store as plain string in DB (converted to JSON string if needed, but here sticking to what Columns expects)
    // Columns expects JSON string of array. 
    // Form input is "tag1, tag2". schema output is "tag1, tag2".
    // We need to convert "tag1, tag2" -> '["tag1", "tag2"]'

    let tagsToStore = validated.tags;

    // Parse comma separated string to array, then JSON stringify
    if (!tagsToStore.trim().startsWith("[")) {
        const arr = tagsToStore.split(',').map(t => t.trim()).filter(Boolean);
        tagsToStore = JSON.stringify(arr);
    }

    await createProjectDB({
        ...validated,
        tags: tagsToStore,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    revalidatePath('/admin/dashboard/projects');
    revalidatePath('/');
}

export async function updateProject(id: string, data: ProjectFormValues) {
    const validated = projectSchema.parse(data);

    let tagsToStore = validated.tags;
    if (!tagsToStore.trim().startsWith("[")) {
        const arr = tagsToStore.split(',').map(t => t.trim()).filter(Boolean);
        tagsToStore = JSON.stringify(arr);
    }

    await updateProjectDB(id, {
        ...validated,
        tags: tagsToStore,
        updatedAt: new Date()
    });

    revalidatePath('/admin/dashboard/projects');
    revalidatePath('/');
}

export async function deleteProject(id: string) {
    await deleteProjectDB(id);
    revalidatePath('/admin/dashboard/projects');
    revalidatePath('/');
}

// SKILLS

export async function createSkill(data: SkillFormValues) {
    const validated = skillSchema.parse(data);
    await createSkillDB({
        ...validated,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    revalidatePath('/admin/dashboard/skills');
    revalidatePath('/');
}

export async function updateSkill(id: string, data: SkillFormValues) {
    const validated = skillSchema.parse(data);
    await updateSkillDB(id, {
        ...validated,
        updatedAt: new Date()
    });
    revalidatePath('/admin/dashboard/skills');
    revalidatePath('/');
}

export async function deleteSkill(id: string) {
    await deleteSkillDB(id);
    revalidatePath('/admin/dashboard/skills');
    revalidatePath('/');
}

// EXPERIENCES

export async function createExperience(data: ExperienceFormValues) {
    const validated = experienceSchema.parse(data);
    await createExperienceDB({
        ...validated,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    revalidatePath('/admin/dashboard/experiences');
    revalidatePath('/');
}

export async function updateExperience(id: string, data: ExperienceFormValues) {
    const validated = experienceSchema.parse(data);
    await updateExperienceDB(id, {
        ...validated,
        updatedAt: new Date()
    });
    revalidatePath('/admin/dashboard/experiences');
    revalidatePath('/');
}

export async function deleteExperience(id: string) {
    await deleteExperienceDB(id);
    revalidatePath('/admin/dashboard/experiences');
    revalidatePath('/');
}

// PROFILE

export async function updateProfile(data: ProfileFormValues) {
    const validated = profileSchema.parse(data);
    await updateProfileDB(validated);
    revalidatePath('/admin/dashboard/profile');
    revalidatePath('/');
}
