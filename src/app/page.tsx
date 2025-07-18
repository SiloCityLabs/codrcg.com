// --- React ---
import { Container, Row, Col } from 'react-bootstrap';
// --- Next ---
import type { Metadata } from 'next';
// --- Layout ---
import PageLayout from '@/components/PageLayout';
// --- Components ---
import HeroSection from '@/components/home/HeroSection';
import FeaturedTools from '@/components/home/FeaturedTools';
import GamesShowcase from '@/components/home/GamesShowcase';
import LatestUpdates from '@/components/home/LatestUpdates';
import CommunitySupport from '@/components/home/CommunitySupport';
import FAQ from '@/components/home/FAQ';
// --- Data ---
import games from '@/data/home/games.json';
import featuredToolsData from '@/data/home/featured-tools.json';
import updatesData from '@/data/changelog/2025.json';
import faqData from '@/data/home/faq.json';

// --- Metadata ---
export const metadata: Metadata = {
  title: 'COD RCG - The Ultimate Call of Duty Toolkit',
  description:
    'Your central hub for all things Call of Duty. Featuring random class generators, weapon and perk information, and tools for every major title, including Modern Warfare, Black Ops, Warzone, and more. Find the best loadouts and challenge yourself with our randomizers.',
  keywords: [
    'Call of Duty',
    'COD',
    'random class generator',
    'loadout generator',
    'COD tools',
    'Modern Warfare',
    'Black Ops',
    'Warzone',
    'Vanguard',
    'Infinite Warfare',
    'World War 2',
    'class randomizer',
    'weapon stats',
    'perk information',
    'COD RCG',
  ],
};

export default function HomePage() {
  // --- Prepare Data on the Server ---
  // Sort tools to prevent hydration errors on the client.
  const sortedTools = [...featuredToolsData].sort(() => 0.5 - Math.random()).slice(0, 3);

  // Get the most recent update from the changelog.
  const latestThreeUpdates = updatesData.slice(0, 3);

  return (
    <PageLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Tools Section */}
      <Container className='my-5'>
        <h2 className='text-center mb-4'>Featured Tools</h2>
        {/* Pass the pre-sorted array to the component */}
        <FeaturedTools tools={sortedTools} />
      </Container>

      {/* Games Showcase Section */}
      <div className='bg-light py-5'>
        <Container>
          <h2 className='text-center mb-4'>Find Tools by Game</h2>
          <GamesShowcase games={games} />
        </Container>
      </div>

      {/* Latest Updates & Community Section */}
      <Container className='my-5'>
        <Row>
          <Col md={6}>
            <h2 className='mb-4'>Latest Updates</h2>
            <LatestUpdates updates={latestThreeUpdates} />
          </Col>
          <Col md={6}>
            <h2 className='mb-4'>Join the Community</h2>
            <CommunitySupport />
          </Col>
        </Row>
      </Container>

      {/* FAQ Section */}
      <div className='bg-light py-5'>
        <Container>
          <h2 className='text-center mb-4'>Frequently Asked Questions</h2>
          <FAQ faqData={faqData} />
        </Container>
      </div>
    </PageLayout>
  );
}
