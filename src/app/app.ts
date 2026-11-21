import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { profile } from './portfolio.data';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('laptopStage') laptopStage?: ElementRef<HTMLDivElement>;
  @ViewChild('introVideo') introVideo?: ElementRef<HTMLVideoElement>;

  protected readonly profile = profile;
  protected readonly year = new Date().getFullYear();
  protected readonly videoMissing = signal(false);
  protected readonly soundEnabled = signal(false);
  protected readonly formStatus = signal('');
  protected readonly formState = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  protected readonly formspreeId = 'xwlonkzo';

  protected readonly experience = [
    'Made a core payments flow more reliable by resolving TypeScript and ESLint violations in a large monorepo, cutting static-analysis debt and keeping CI lint gates stable.',
    'Refactored E2E test utilities to eliminate flaky waits and improve reusable page-object helpers.',
    'Aligned service tests with production query-parameter behaviour, reducing false failures.',
    'Enforced coding standards through lint-remediation pipeline work and repeated quality passes across feature branches.',
    'Expanded coverage with new end-to-end scenarios and updated test data for critical user journeys.',
    'Removed duplicate dialog type declarations and cleaned up typing inconsistencies in core modules.',
  ];

  protected readonly projects = [
    {
      tag: 'Prototype',
      title: 'ATM Agent',
      tagline: 'An AI assistant that turns a plain-text system description into an architecture, a STRIDE threat model and an implementation plan.',
      bullets: [
        'Built a 3-stage pipeline with end-to-end traceability: every component and data flow maps to threats, and every threat maps to the plan task that mitigates it.',
        'Developed a Streamlit UI with auto-rendered Mermaid architecture diagrams, editable threat tables and phased task views.',
        'Added a pluggable LLM provider layer (Anthropic, AWS Bedrock, Google Vertex, Azure Foundry) and developed mock-first.',
        'Hardened against AI-specific risks: safe rendering of LLM output, prompt injection and confidential data.',
      ],
      tech: ['Python', 'Streamlit', 'Claude', 'Anthropic SDK', 'STRIDE', 'Mermaid'],
      link: 'https://github.com/Sanjanaashok27/Agent-arch-threatmodel',
    },
    {
      tag: 'Personal project',
      title: 'E-Commerce Platform',
      tagline: 'A full-stack store with separate admin and customer experiences.',
      bullets: [
        'Designed a TS-based full-stack architecture with separate admin and customer interfaces, built for performance.',
        'Built reusable Angular components with role-based access control, cutting new-feature time by 40%.',
      ],
      tech: ['Angular', 'Spring Boot', 'MySQL'],
      link: 'https://github.com/Sanjanaashok27/ekart-app',
    },
    {
      tag: 'Team project',
      title: 'Smart Hotel Booking System',
      tagline: 'Microservices for booking, payments and room management.',
      bullets: [
        'Built loosely coupled microservices for booking, payments and room management, designed to scale horizontally.',
        'Integrated the Razorpay API with end-to-end transaction testing for a bug-free booking-to-payment flow.',
      ],
      tech: ['Spring Boot', 'React', 'MySQL', 'Razorpay API'],
      link: 'https://github.com/Jashwanth-PV/Smart-Hotel-Booking-System',
    },
    {
      tag: 'Personal project',
      title: 'True Habit Tracker',
      tagline: 'A personal app for building habits and tracking daily streaks.',
      bullets: [],
      tech: [],
      link: 'https://github.com/Sanjanaashok27/true-habit-tracker',
    },
  ];

  private observer?: IntersectionObserver;
  private laptopCleanup?: () => void;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => this.observer?.observe(element));

    document.querySelectorAll<HTMLElement>('.tilt').forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    if (this.laptopStage) this.startLaptopWhenVisible();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.laptopCleanup?.();
  }

  private startLaptopWhenVisible(): void {
    const stage = this.laptopStage?.nativeElement;
    if (!stage) return;
    const observer = new IntersectionObserver(async (entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      await this.loadLaptop();
    }, { threshold: 0.15 });
    observer.observe(stage);
  }

  private async loadLaptop(): Promise<void> {
    const stage = this.laptopStage?.nativeElement;
    if (!stage) return;
    try {
      const [THREE, { RoomEnvironment }, { RoundedBoxGeometry }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/environments/RoomEnvironment.js'),
        import('three/examples/jsm/geometries/RoundedBoxGeometry.js'),
      ]);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 2.2, 13);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      stage.appendChild(renderer.domElement);

      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.add(new THREE.HemisphereLight(0xffffff, 0x9eafc8, 1.8));
      const rim = new THREE.DirectionalLight(0x65a3ff, 3);
      rim.position.set(-5, 5, 7);
      scene.add(rim);

      const laptop = new THREE.Group();
      laptop.rotation.y = -0.42;
      scene.add(laptop);

      const silver = new THREE.MeshStandardMaterial({ color: 0xdfe6ed, metalness: 0.82, roughness: 0.22 });
      const dark = new THREE.MeshStandardMaterial({ color: 0x16243a, roughness: 0.5 });
      const base = new THREE.Mesh(new RoundedBoxGeometry(7.8, 0.42, 5.2, 6, 0.16), silver);
      base.position.y = -1.65;
      base.castShadow = true;
      laptop.add(base);

      const lid = new THREE.Group();
      lid.position.set(0, -1.42, -2.55);
      lid.rotation.x = reduced ? -0.32 : -1.42;
      laptop.add(lid);
      const lidShell = new THREE.Mesh(new RoundedBoxGeometry(7.8, 5.2, 0.22, 6, 0.14), silver);
      lidShell.position.y = 2.55;
      lid.add(lidShell);

      const keyboardCanvas = document.createElement('canvas');
      keyboardCanvas.width = 1024; keyboardCanvas.height = 620;
      const kctx = keyboardCanvas.getContext('2d')!;
      kctx.fillStyle = '#dfe6ed'; kctx.fillRect(0, 0, 1024, 620);
      kctx.fillStyle = '#253448';
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 12; c++) {
          const w = r === 4 ? 72 : 68;
          kctx.beginPath(); kctx.roundRect(95 + c * 74, 75 + r * 82, w, 58, 8); kctx.fill();
        }
      }
      kctx.strokeStyle = '#718198'; kctx.lineWidth = 5;
      kctx.beginPath(); kctx.roundRect(380, 505, 270, 76, 12); kctx.stroke();
      const keyboard = new THREE.Mesh(
        new THREE.PlaneGeometry(7.25, 4.35),
        new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(keyboardCanvas), roughness: 0.45 })
      );
      keyboard.rotation.x = -Math.PI / 2;
      keyboard.position.set(0, -1.42, 0);
      laptop.add(keyboard);

      const codeCanvas = document.createElement('canvas');
      codeCanvas.width = 1280; codeCanvas.height = 800;
      const cctx = codeCanvas.getContext('2d')!;
      const code = [
        "import { Component, signal } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-portfolio',",
        "  template: '<h1>{{ name() }}</h1>',",
        '})',
        'export class Portfolio {',
        "  name = signal('Sanjana Ashok');",
        "  role = signal('Full Stack Engineer');",
        "  stack = ['Angular', 'Spring Boot'];",
        "  pipeline = 'green'; // always",
        '}',
      ];
      cctx.fillStyle = '#101827'; cctx.fillRect(0, 0, 1280, 800);
      cctx.fillStyle = '#ff6b78'; cctx.beginPath(); cctx.arc(38, 38, 11, 0, Math.PI * 2); cctx.fill();
      cctx.fillStyle = '#ffd166'; cctx.beginPath(); cctx.arc(72, 38, 11, 0, Math.PI * 2); cctx.fill();
      cctx.fillStyle = '#63d19a'; cctx.beginPath(); cctx.arc(106, 38, 11, 0, Math.PI * 2); cctx.fill();
      cctx.fillStyle = '#172238'; cctx.fillRect(0, 68, 1280, 62);
      cctx.fillStyle = '#dce7f5'; cctx.font = '26px JetBrains Mono'; cctx.fillText('portfolio.ts', 42, 111);
      cctx.font = '30px JetBrains Mono';
      let caret = reduced ? code.join('\n').length : 0;
      const drawCode = () => {
        cctx.fillStyle = '#101827'; cctx.fillRect(0, 130, 1280, 670);
        const source = code.join('\n').slice(0, caret);
        const lines = source.split('\n');
        lines.forEach((line, index) => {
          cctx.fillStyle = '#5e7091'; cctx.fillText(String(index + 1).padStart(2, '0'), 26, 180 + index * 43);
          cctx.fillStyle = line.includes('@Component') || line.includes('export') ? '#7aa2f7' : '#dce7f5';
          cctx.fillText(line, 100, 180 + index * 43);
        });
        if (!reduced) {
          cctx.fillStyle = '#66a6ff'; cctx.fillRect(100 + (lines.at(-1)?.length || 0) * 18, 150 + (lines.length - 1) * 43, 3, 36);
        }
      };
      drawCode();
      const texture = new THREE.CanvasTexture(codeCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(7.25, 4.55),
        new THREE.MeshBasicMaterial({ map: texture })
      );
      screen.position.set(0, 2.55, 0.12);
      lid.add(screen);

      const shadow = new THREE.Mesh(
        new THREE.CircleGeometry(4.7, 64),
        new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.18, depthWrite: false })
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.set(0, -2.02, 0);
      shadow.scale.set(1.25, 0.45, 1);
      scene.add(shadow);

      let raf = 0;
      let started = performance.now();
      let typingStarted = false;
      const fullCodeLength = code.join('\n').length;
      const animate = (now: number) => {
        const elapsed = (now - started) / 1000;
        if (!reduced && elapsed < 2) lid.rotation.x = -1.42 + (1.10 * elapsed / 2);
        else if (!typingStarted) { typingStarted = true; started = now; }
        if (!reduced && typingStarted && caret < fullCodeLength) {
          caret = Math.min(fullCodeLength, caret + 2);
          drawCode();
          texture.needsUpdate = true;
        } else if (!reduced && caret >= fullCodeLength && (now - started) > 9000) {
          caret = 0; started = now;
          drawCode();
        }
        if (!reduced) laptop.position.y = Math.sin(now * 0.0012) * 0.08;
        laptop.rotation.y += (stage.matches(':hover') ? 0 : 0);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };

      const resize = () => {
        const width = stage.clientWidth;
        const height = stage.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.position.z = width < 500 ? 15 : 13;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize);
      raf = requestAnimationFrame(animate);

      this.laptopCleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        renderer.dispose();
        pmrem.dispose();
        stage.replaceChildren();
      };
    } catch {
      stage.innerHTML = `<div class="code-fallback"><span>import &#123; Component, signal &#125; from '@angular/core';</span><br><span>@Component(&#123; selector: 'app-portfolio' &#125;)</span><br><span>export class Portfolio &#123;</span><br><span>&nbsp;&nbsp;name = signal('Sanjana Ashok');</span><br><span>&#125;</span></div>`;
    }
  }

  protected toggleSound(): void {
    const video = this.introVideo?.nativeElement;
    if (!video) return;
    if (!this.soundEnabled()) {
      video.currentTime = 0;
      video.muted = false;
      video.play().catch(() => {});
      this.soundEnabled.set(true);
    } else {
      video.muted = true;
      this.soundEnabled.set(false);
    }
  }

  protected videoError(): void {
    this.videoMissing.set(true);
  }

  protected async submitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    if (!this.formspreeId) {
      const subject = encodeURIComponent('Portfolio enquiry');
      const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
      window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    this.formState.set('sending');
    try {
      const response = await fetch(`https://formspree.io/f/${this.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!response.ok) throw new Error('Form submission failed');
      form.reset();
      this.formState.set('success');
      this.formStatus.set("Thank you, your message is on its way. I'll reply soon.");
    } catch {
      this.formState.set('error');
      this.formStatus.set(`Something went wrong. Please email me directly at ${this.profile.email}.`);
    }
  }
}
