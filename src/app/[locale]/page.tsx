import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import AutomationShowcase from '@/components/sections/AutomationShowcase';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
    return (
        <>
            <Hero />
            <About />
            <Projects />
            <AutomationShowcase />
            <Testimonials />
            <Contact />
        </>
    );
}
