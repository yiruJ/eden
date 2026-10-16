import { CTABanner } from '../components/sections/CTABanner';
import jiminImg from '../assets/teachers/jimin.webp';
import hanaImg from '../assets/teachers/hana.webp';
import dylanImg from '../assets/teachers/dylan.webp';
import rachelImg from '../assets/teachers/rachel.webp';
import aureliaImg from '../assets/teachers/aurelia.webp';
import lucasImg from '../assets/teachers/lucas.webp';
import erikImg from '../assets/teachers/erik.webp';
import elijahImg from '../assets/teachers/elijah.webp';
import { SEO } from '../components/SEO';
import { TeacherCard, type Teacher } from '../components/sections/TeacherCard';
import { CapIcon } from '../components/ui/icons/CapIcon';
import { ShieldCheckIcon } from '../components/ui/icons/ShieldCheckIcon';
import { MusicNoteIcon } from '../components/ui/icons/MusicNoteIcon';

const teachers: Teacher[] = [
  {
    name: 'Dylan Lee',
    instruments: ['Violin', 'Viola'],
    image: dylanImg,
    bio: 'Dylan co-founded Eden Music Academy to build the kind of studio he wished he\'d had as a young student: structured, encouraging, and genuinely invested in every student\'s progress. His dual training in violin and viola gives him a rare, rounded perspective on string playing and ensemble musicianship that shapes every lesson he teaches. Beyond teaching, Dylan helps lead the academy day to day, setting the standard for how every class runs and the culture students feel from their very first visit.',
    highlights: ['Co-Founder'],
  },
  {
    name: 'Jimin Yang',
    instruments: ['Violin'],
    image: jiminImg,
    bio: 'A passionate violinist with a deep commitment to nurturing each student\'s individual voice and musical confidence.',
    highlights: [],
  },
  {
    name: 'Hana Lee',
    instruments: ['Violin'],
    image: hanaImg,
    bio: 'Hana is a scholarship recipient at the Sydney Conservatorium, studying under Professor Goetz Richter. She teaches using Suzuki and AMEB methods with students from age 5, including AMEB examination preparation. Fluent in English and Mandarin.',
    highlights: [
      'Ted & Susan Meller Memorial Scholarship 2024–2027',
      'AMEB AMusA Diploma',
      'Concerto Competition Scholarship winner 2021 & 2022',
    ],
  },
  {
    name: 'Rachel Jeong',
    instruments: ['Cello', 'Piano'],
    image: rachelImg,
    bio: 'Rachel is completing her Bachelor of Music Performance at the Sydney Conservatorium under Julian Smiles. A graduate of the Victorian College of the Arts Secondary School, she brings real performance experience, including international touring and radio broadcast work, to every lesson.',
    highlights: [
      'Melbourne String Ensemble',
      '2024 Germany & Czechia International Tour',
      '3MBS Radio soloist',
    ],
  },
  {
    name: 'Aurelia',
    instruments: ['Violin'],
    image: aureliaImg,
    bio: 'Aurelia has a rare ability to make young students feel genuinely excited about playing. She has been teaching violin and drums to children aged 5 to 12 since 2021, with a natural warmth and patience that keeps kids coming back week after week. Now studying classical violin at the Sydney Conservatorium of Music, she knows exactly what it takes to go from a first note to a real performance, and she loves being part of that journey.',
    highlights: [
      'Australian Youth Orchestra: National Camp 3 years running, 2026 Melbourne season',
      'AMusA Diploma with Distinction (AMEB) 2023',
      'Goodlet Memorial Music Scholarship, PLC Sydney 2017–2024',
    ],
  },
  {
    name: 'Elijah Lee',
    instruments: ['Cello', 'Piano'],
    image: elijahImg,
    school: 'UNSW',
    bio: 'Elijah brings a rare dual fluency in cello and piano. His teaching draws on a thorough classical training to help students build strong technique, expressive depth, and a genuine love of music from the very first lesson.',
    highlights: [],
  },
  {
    name: 'Lucas Choi',
    instruments: ['Cello'],
    image: lucasImg,
    bio: 'Lucas brings a rare versatility to the studio — trained not just on cello but piano, trombone and euphonium too, he understands music from every angle and loves sharing that perspective with students. Currently pursuing his Bachelor of Music Performance in Cello at the Sydney Conservatorium of Music, he pairs serious technical grounding with genuine warmth, making every lesson feel less like a chore and more like discovery. Students walk away not just playing better, but actually excited to pick their instrument back up.',
    highlights: [
      'Sydney Conservatorium of Music Corinna D\'Hage Mayer String Scholarship',
      'The Dame Joan Sutherland Memorial Award for Outstanding Achievements in Music (2024)',
      'AMEB AMusA & LMusA Cello Exams (Pass)',
    ],
  },
  {
    name: 'Erik Wild',
    instruments: ['Cello'],
    image: erikImg,
    bio: 'Erik is studying his Bachelor of Music in Cello Performance at the Sydney Conservatorium of Music, where he learns from renowned cellists Christopher Bennett and Julian Smiles. As a member of the cello section in Sydney Youth Orchestra\'s flagship orchestra, he performs in several orchestral projects and international tours each year. Erik believes every young musician deserves to experience the life-changing joy of making music, and he brings that passion into every lesson, sharing everything he has learned with the next generation of players.',
    highlights: [
      'Sydney Youth Orchestras: flagship orchestra, cello section',
      'Annual international orchestral tours',
      'Studies with Christopher Bennett and Julian Smiles',
    ],
  },
];

export function TeachersPage() {
  return (
    <>
      <SEO
        title="Eden Music Academy: Meet Our Sydney Conservatorium-Trained Teachers"
        description="Meet Eden Music Academy's qualified music teachers — all students of the Sydney Conservatorium of Music. Expert violin, viola, cello & piano tuition in Strathfield."
        canonical="/teachers"
      />
      {/* Header */}
      <section className="pt-28 pb-16 px-6 bg-background text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            The People Behind Eden
          </span>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
            Meet Our Teachers
          </h1>
          <p className="text-lg text-charcoal/65 font-light leading-relaxed max-w-xl mx-auto">
            Every teacher at Eden brings genuine passion for music and a natural gift for
            inspiring students to fall in love with playing.
          </p>
        </div>
      </section>

      {/* Teachers grid */}
      <section className="pb-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.name} {...teacher} />
          ))}
        </div>
      </section>

      {/* Credential callout */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-primary/5 border border-primary/10 px-10 py-10
                          grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto">
                <CapIcon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-display font-bold text-charcoal text-base">
                Sydney Conservatorium
              </p>
              <p className="text-xs text-charcoal/55 leading-relaxed">
                All teachers study at Australia's leading conservatorium of music
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                <ShieldCheckIcon className="w-6 h-6 text-accent" />
              </div>
              <p className="font-display font-bold text-charcoal text-base">
                Fully Verified
              </p>
              <p className="text-xs text-charcoal/55 leading-relaxed">
                Every teacher holds a current Working With Children Check
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto">
                <MusicNoteIcon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-display font-bold text-charcoal text-base">
                Specialist Strings
              </p>
              <p className="text-xs text-charcoal/55 leading-relaxed">
                Dedicated instruction in violin, viola, cello and piano
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the team */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
            Join Us
          </span>
          <h2 className="text-3xl font-display font-bold text-charcoal">
            Interested in Teaching at Eden?
          </h2>
          <p className="text-charcoal/60 leading-relaxed font-light">
            We're always looking for passionate, qualified teachers who share our values. Get in touch.
          </p>
          <a
            href="mailto:info@edenmusicacademy.com"
            data-conversion="off"
            className="inline-flex items-center gap-2 mt-4 px-8 py-3.5 bg-primary text-white
                       rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
