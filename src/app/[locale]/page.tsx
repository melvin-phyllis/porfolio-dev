import { getProfile, getProjects, getSkills, getExperiences } from "@/lib/firebase-db";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

// Force dynamic behavior because of db calls
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Parallel fetching for performance
  const [profile, skills, allProjects, allExperiences] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects(),
    getExperiences()
  ]);

  // Filter and sort in JS/TS
  const projects = allProjects
    .filter(p => p.featured)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const experiences = allExperiences
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // or by date field? Experience has 'date' string usually. Let's use createdAt or just ID if reliable. Prisma used ID desc. 
  // Actually experience has `date` string like "2023 - 2024". CreatedAt is when I added it.
  // Let's stick to createdAt for now as ID in Firebase is random string.


  // Construct efficient data object
  const heroData = profile ? {
    name: "Marie Danielle Akpeuby", // Fallback name if not in profile or dynamic
    title: profile.headline,
    subtitle: profile.subheadline,
    image: profile.image || "/images/profile.svg"
  } : undefined;

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} stats={[
        { value: experiences.length, label: "experience" },
        { value: projects.length, label: "projects" },
        { value: 10, label: "clients" }, // Static for now
        { value: skills.length, label: "technologies" },
      ]} />
      <Skills skills={skills} />
      <Timeline experiences={experiences} />
      <Projects projects={projects} />
      <Services />
      <Testimonials />
      <FAQ />
      <Contact profile={profile} />
    </>
  );
}
