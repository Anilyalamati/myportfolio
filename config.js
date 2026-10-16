/**
     * REPLACEABLE PORTFOLIO INTEGRATION CONFIGURATION
     * -----------------------------------------------
     * Easy-to-update configuration block for optional assets & direct repository URLs.
     * No unverified links, fake emails, or placeholder files are shown as active unless provided here.
     */
    const PORTFOLIO_CONFIG = {
      name: 'Anil Yalamati',
      githubProfile: 'https://github.com/Anilyalamati',
      linkedinProfile: 'https://linkedin.com/in/anilyalamati/',
      easytripLiveUrl: 'https://easytrip-travel.vercel.app',
      // Optional replaceable fields (leave empty string '' until verified asset is added):
      email: '',          // e.g. 'anil@example.com' -> automatically renders direct mailto CTA
      resumeUrl: '',      // e.g. '/assets/Anil-Yalamati-Resume.pdf' -> automatically renders Resume nav action
      portraitUrl: '',    // e.g. '/assets/anil-portrait.jpg' -> automatically replaces monogram with photo
      repositories: {
        easytrip: '',     // Falls back to githubProfile until specific repo URL is set
        deepfake: '',     // Falls back to githubProfile until specific repo URL is set
        recommender: ''   // Falls back to githubProfile until specific repo URL is set
      }
    };

// Recommendation System Preview Seed Profiles
const REC_SEED_DATA = {
      'ai-systems': [
        { rank: '01', title: 'Content-Based Vector Similarity Engine', tags: 'Cosine Distance • TF-IDF / Embeddings', align: 'High Feature Overlap' },
        { rank: '02', title: 'Vision Frame Artifact Inspection Pipeline', tags: 'Spatial Filtering • Keyframe ROI', align: 'Shared ML Pipeline Pattern' },
        { rank: '03', title: 'Preference-Guided Itinerary Structuring', tags: 'Constraint Scoring • User Inputs', align: 'Personalization Domain Match' }
      ],
      'data-eng': [
        { rank: '01', title: 'Sparse Matrix Feature Normalization', tags: 'Pandas • NumPy • Missing-Value Handling', align: 'Core Preprocessing Match' },
        { rank: '02', title: 'Metadata Tokenization & Attribute Weighting', tags: 'Scikit-Learn • Vector Space', align: 'Pipeline Stage Dependency' },
        { rank: '03', title: 'Exploratory Distribution & Cold-Start Analysis', tags: 'EDA • Qualitative Ranking Check', align: 'Evaluation Workflow Match' }
      ],
      'web-ux': [
        { rank: '01', title: 'EasyTrip Interactive Travel Companion UI', tags: 'Responsive Web • Vercel Deployment', align: 'Frontend Product Architecture' },
        { rank: '02', title: 'Diagnostic Media Upload & Result Console', tags: 'Interactive State • Visual Feedback', align: 'Human-Centered AI Interface' },
        { rank: '03', title: 'Real-Time Top-N Recommendation Explorer', tags: 'DOM State • Interactive Filtering', align: 'Interactive Data Presentation' }
      ]
    };

// Technical Architecture Modal Content
const MODAL_CONTENT = {
      deepfake: {
        eyebrow: 'PROJECT 02 // TECHNICAL WORKFLOW OVERVIEW',
        title: 'Deepfake Detection Web Application',
        repoUrl: PORTFOLIO_CONFIG.repositories.deepfake || PORTFOLIO_CONFIG.githubProfile,
        body: `
          <p>
            This project explores the end-to-end workflow required to inspect digital images and short video clips for potential synthetic manipulation through an approachable web interface.
          </p>
          <div class="p-4 rounded bg-charcoal-950 border border-white/10 space-y-2">
            <h4 class="font-mono text-xs text-lime uppercase">1. Media Ingestion &amp; Preprocessing</h4>
            <p class="text-xs text-warm-300">
              Handles static image uploads and video streams by sampling keyframes, isolating facial bounding regions, and normalizing resolution and color channels prior to analysis.
            </p>
          </div>
          <div class="p-4 rounded bg-charcoal-950 border border-white/10 space-y-2">
            <h4 class="font-mono text-xs text-lime uppercase">2. Spatial &amp; Temporal Feature Inspection</h4>
            <p class="text-xs text-warm-300">
              Explores convolutional feature extraction and visual boundary inspection around high-artifact zones (periocular region, jawline blending edges, and inconsistent lighting reflections).
            </p>
          </div>
          <div class="p-4 rounded bg-charcoal-950 border border-white/10 space-y-2">
            <h4 class="font-mono text-xs text-lime uppercase">3. Practical Engineering Challenges</h4>
            <p class="text-xs text-warm-300">
              Addresses real-world challenges such as heavy compression artifacts on re-shared videos, varying illumination, and presenting clear diagnostic steps without overclaiming model certainty.
            </p>
          </div>
        `
      },
      recommender: {
        eyebrow: 'PROJECT 03 // MACHINE LEARNING WORKFLOW OVERVIEW',
        title: 'Machine-Learning Recommendation System',
        repoUrl: PORTFOLIO_CONFIG.repositories.recommender || PORTFOLIO_CONFIG.githubProfile,
        body: `
          <p>
            A practical machine-learning implementation focused on turning structured item metadata and feature vectors into relevant Top-N recommendations.
          </p>
          <div class="p-4 rounded bg-charcoal-950 border border-white/10 space-y-2">
            <h4 class="font-mono text-xs text-lime uppercase">1. Dataset Preparation &amp; Feature Engineering</h4>
            <p class="text-xs text-warm-300">
              Cleans raw tabular datasets using Pandas and NumPy, resolves missing attributes, and constructs consolidated feature representations across item categories and descriptors.
            </p>
          </div>
          <div class="p-4 rounded bg-charcoal-950 border border-white/10 space-y-2">
            <h4 class="font-mono text-xs text-lime uppercase">2. Vector Space &amp; Cosine Similarity</h4>
            <p class="text-xs text-warm-300">
              Transforms textual and categorical attributes into numerical vectors and computes pairwise cosine similarity matrices in Scikit-Learn to retrieve closest neighbor candidates.
            </p>
          </div>
          <div class="p-4 rounded bg-charcoal-950 border border-white/10 space-y-2">
            <h4 class="font-mono text-xs text-lime uppercase">3. Qualitative Evaluation</h4>
            <p class="text-xs text-warm-300">
              Inspects Top-N ranking coherence across varied seed inputs and examines how feature weighting affects recommendation diversity.
            </p>
          </div>
        `
      }
    };
