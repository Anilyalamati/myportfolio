# Anil Yalamati — AI/ML Developer Portfolio

A dark editorial personal developer portfolio built for **Anil Yalamati** (B.Tech AI/ML Student & Developer).

## Folder Structure

```text
anil-yalamati-portfolio/
├── index.html                        # Modular HTML5 entry point (links to css/ and js/)
├── anil-yalamati-portfolio.html      # Merged all-in-one single-file bundle (ready for instant preview)
├── css/
│   └── styles.css                    # Custom editorial variables, typography scale, animations, and reduced-motion rules
├── js/
│   ├── tailwind.config.js            # Tailwind color palette (charcoal, warm white, electric lime) & font family config
│   ├── config.js                     # Replaceable portfolio data (links, optional resume/portrait/email slots, modal & ML seed data)
│   └── main.js                       # Navigation scroll-spy, IntersectionObserver reveals, project preview tabs, modal, & hero canvas
├── assets/
│   └── favicon.svg                   # Custom AY geometric monogram SVG icon
└── README.md                         # Project documentation & customization guide
```

## Verified Links Included

- **LinkedIn:** [https://linkedin.com/in/anilyalamati/](https://linkedin.com/in/anilyalamati/)
- **GitHub Profile:** [https://github.com/Anilyalamati](https://github.com/Anilyalamati)
- **EasyTrip Live Demo:** [https://easytrip-travel.vercel.app](https://easytrip-travel.vercel.app)
- **Optional Public Learning Resources:**
  - [Google Skills](https://www.skills.google/)
  - [Google Cloud Certificates](https://cloud.google.com/learn/certificates)
  - [Google Cloud Training Credentials](https://cloud.google.com/learn/training/credentials)
  - [Google Cloud Student Credits](https://cloud.google.com/edu/students)

## How to Customize Optional Assets

Open `js/config.js` and update `PORTFOLIO_CONFIG`:

- `email`: Add your verified email string to automatically enable the direct **Email Directly** button in the Contact section.
- `resumeUrl`: Add a path or URL to your PDF resume to automatically display the **Resume** button in the header navigation.
- `portraitUrl`: Add a path to your portrait image to replace the architectural AY monogram card in the About section.
- `repositories`: Add direct GitHub repository URLs for `easytrip`, `deepfake`, or `recommender` as you publish them.
