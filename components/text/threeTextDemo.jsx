// components/ThreeDTextDemo.js
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { loadFont } from 'load-bmfont';
import createGeometry from 'three-bmfont-text';
import MSDFShader from 'three-bmfont-text/shaders/msdf';

if (typeof window !== 'undefined') {
  window.THREE = THREE;
}

// Dynamically import THREE-dependent libraries
const loadThreeBMFont = async () => {
  const createGeometry = (await import('three-bmfont-text')).default;
  const MSDFShader = (await import('three-bmfont-text/shaders/msdf')).default;
  return { createGeometry, MSDFShader };
};

// Shaders (moved to separate files in production)
const shaders = {
  vertex: {
    demo1: /* glsl */`
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }
    `,
    demo2: /* glsl */`
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }
    `,
    demo3: /* glsl */`
      varying vec2 vUv;
      uniform float uTime;
      mat4 rotation3d(vec3 axis, float angle) {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;
        return mat4(
          oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
          oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
          oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
          0.0,                                0.0,                                0.0,                                1.0
        );
      }
      vec3 rotate(vec3 v, vec3 axis, float angle) {
        return (rotation3d(axis, angle) * vec4(v, 1.0)).xyz;
      }
      void main() {
        vUv = uv;
        vec3 pos = position;
        vec3 axis = vec3(1., 0., 0.);
        float twist = 0.1;
        float angle = pos.x * twist;
        vec3 transformed = rotate(pos, axis, angle);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.);
      }
    `,
    demo4: /* glsl */`
      varying vec2 vUv;
      varying float vWave;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float freq = 0.5;
        float amp = 1.;
        float time = uTime * 3.5;
        pos.z += sin((pos.x - pos.y) * freq - time) * amp;
        vWave = pos.z;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
      }
    `
  },
  fragment: {
    demo1: /* glsl */`
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      uniform sampler2D uTexture;
      void main() {
        float time = uTime * 0.4;
        vec2 repeat = -vec2(12., 3.);
        vec2 uv = fract(vUv * repeat - vec2(time, 0.));
        vec3 texture = texture2D(uTexture, uv).rgb;
        float fog = clamp(vPosition.z / 6., 0., 1.);
        vec3 fragColor = mix(vec3(0.), texture, fog);
        gl_FragColor = vec4(fragColor, 1.);
      }
    `,
    demo2: /* glsl */`
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      uniform sampler2D uTexture;
      void main() {
        float time = uTime * 1.5;
        vec2 repeat = vec2(12., 12.);
        vec2 uv = fract(vUv * repeat + vec2(sin(vUv.y * 1.) * 5., time));
        vec3 texture = texture2D(uTexture, uv).rgb;
        float depth = vPosition.z / 10.;
        vec3 fragColor = mix(vec3(0., 0., .8), texture, depth);
        gl_FragColor = vec4(fragColor, 1.);
      }
    `,
    demo3: /* glsl */`
      varying vec2 vUv;
      uniform float uTime;
      uniform sampler2D uTexture;
      void main() {
        float time = uTime * 0.25;
        vec2 uv = fract(vUv * 3. - vec2(time, 0.));
        vec3 texture = texture2D(uTexture, uv).rgb;
        gl_FragColor = vec4(texture, 1.);
      }
    `,
    demo4: /* glsl */`
      varying vec2 vUv;
      varying float vWave;
      uniform float uTime;
      uniform sampler2D uTexture;
      float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
      }
      void main() {
        float time = uTime * 0.25;
        vec2 repeat = vec2(4., 16.);
        vec2 uv = fract(vUv * repeat);
        vec3 texture = texture2D(uTexture, uv).rgb;
        float wave = vWave;
        wave = map(wave, -1., 1., 0., 0.1);
        float shadow = 1. - wave;
        vec3 fragColor = texture * shadow;
        gl_FragColor = vec4(fragColor, 1.);
      }
    `
  }
};

// Options configuration
const options = [
  {
    word: 'ENDLESS',
    color: '#ffffff',
    fill: '#000000',
    geometry: new THREE.TorusKnotGeometry(9, 3, 768, 3, 4, 3),
    position: { texture: [-0.965, -0.4, 0], mesh: [0, 0, 0] },
    scale: [0.008, 0.04, 1],
    shaders: { vertex: shaders.vertex.demo1, fragment: shaders.fragment.demo1 },
    class: 'demo-1'
  },
  {
    word: 'SWIRL',
    color: '#ffffff',
    fill: '#3e64ff',
    geometry: new THREE.SphereGeometry(12, 64, 64),
    position: { texture: [-0.9, -0.5, 0], mesh: [0, 0, 0] },
    scale: [0.0115, 0.04, 1],
    shaders: { vertex: shaders.vertex.demo2, fragment: shaders.fragment.demo2 },
    class: 'demo-2'
  },
  {
    word: 'TWISTED',
    color: '#ffffff',
    fill: '#d8345f',
    geometry: new THREE.BoxGeometry(100, 10, 10, 64, 64, 64),
    position: { texture: [-0.945, -0.5, 0], mesh: [0, 0, 0] },
    scale: [0.009, 0.04, 1],
    shaders: { vertex: shaders.vertex.demo3, fragment: shaders.fragment.demo3 },
    class: 'demo-3'
  },
  {
    word: 'RELAX',
    color: '#fff',
    fill: '#e3e6e5',
    geometry: new THREE.PlaneGeometry(27, 27, 64, 64),
    position: { texture: [-0.9, -0.65, 0], mesh: [0, 0, 0] },
    scale: [0.014, 0.05, 1],
    shaders: { vertex: shaders.vertex.demo4, fragment: shaders.fragment.demo4 },
    class: 'demo-4'
  }
];

class Type extends THREE.Object3D {
  private opts: any;
  private fontGeometry: any;
  private fontMaterial: any;
  private rt: THREE.WebGLRenderTarget;
  private rtCamera: THREE.PerspectiveCamera;
  private rtScene: THREE.Scene;
  private text: THREE.Mesh;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  public mesh: THREE.Mesh;
  private clock: THREE.Clock;

  constructor(private scene: THREE.Scene, private renderer: THREE.WebGLRenderer) {
    super();
    this.clock = new THREE.Clock();
  }

  async init(opt: any) {
    this.opts = opt;
    
    // Load THREE-dependent libraries
    const { createGeometry, MSDFShader } = await loadThreeBMFont();
    
    return new Promise<void>((resolve) => {
      loadFont('/fonts/Orbitron-Black.fnt', (err, font) => {
        if (err) {
          console.error('Error loading font', err);
          resolve();
          return;
        }

        this.fontGeometry = createGeometry({
          font,
          text: this.opts.word,
        });

        const loader = new THREE.TextureLoader();
        loader.load('/fonts/Orbitron-Black.png', (texture) => {
          this.fontMaterial = new THREE.RawShaderMaterial(
            MSDFShader({
              map: texture,
              side: THREE.DoubleSide,
              transparent: true,
              negate: false,
              color: this.opts.color
            })
          );
          this.createRenderTarget();
          this.createMesh();
          resolve();
        });
      });
    });
  }

  createRenderTarget() {
    this.rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    this.rtCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.rtCamera.position.z = 2.4;
    this.rtScene = new THREE.Scene();
    this.rtScene.background = new THREE.Color(this.opts.fill);

    this.text = new THREE.Mesh(this.fontGeometry, this.fontMaterial);
    this.text.position.set(...this.opts.position.texture);
    this.text.rotation.set(Math.PI, 0, 0);
    this.text.scale.set(...this.opts.scale);
    this.rtScene.add(this.text);
  }

  createMesh() {
    this.geometry = this.opts.geometry;
    this.material = new THREE.ShaderMaterial({
      vertexShader: this.opts.shaders.vertex,
      fragmentShader: this.opts.shaders.fragment,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.rt.texture },
      },
      defines: { PI: Math.PI },
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...this.opts.position.mesh);
    this.mesh.lookAt(new THREE.Vector3());

    this.mesh.onBeforeRender = (renderer: any) => {
      renderer.setRenderTarget(this.rt);
      renderer.render(this.rtScene, this.rtCamera);
      renderer.setRenderTarget(null);
    };

    this.add(this.mesh);
    this.scene.add(this);
  }

  update() {
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
  }
}

class GL {
  public renderer: THREE.WebGLRenderer;
  public camera: THREE.PerspectiveCamera;
  public scene: THREE.Scene;
  private clock: THREE.Clock;
  private frameId: number | null = null;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.addEvents();
    this.animate();
  }

  animate = () => {
    this.frameId = requestAnimationFrame(this.animate);
    this.scene.children.forEach(obj => (obj as any).update?.());
    this.renderer.render(this.scene, this.camera);
  }

  addEvents() {
    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  dispose() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.resize);
    this.container.removeChild(this.renderer.domElement);
    this.renderer.dispose();
  }
}

const ThreeDTextDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<GL | null>(null);
  const typeRefs = useRef<Type[]>([]);
  const [currentDemo, setCurrentDemo] = useState(0);
  const prevDemoRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize GL
    glRef.current = new GL(containerRef.current);

    // Position elements in a circle
    const positionedOptions = options.map((opt, i) => {
      const angle = (i / options.length) * (Math.PI * 2) + Math.PI * 1.5;
      const radius = 50;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      return {
        ...opt,
        position: {
          ...opt.position,
          mesh: [x, 0, z]
        }
      };
    });

    // Create kinetic types
    const initTypes = async () => {
      if (!glRef.current) return;
      
      for (const opt of positionedOptions) {
        const type = new Type(glRef.current.scene, glRef.current.renderer);
        await type.init(opt);
        typeRefs.current.push(type);
      }
    };

    initTypes();

    return () => {
      if (glRef.current) glRef.current.dispose();
      typeRefs.current.forEach(type => {
        if (type.material) type.material.dispose();
        if (type.geometry) type.geometry.dispose();
      });
    };
  }, []);

  const handleClick = (index: number) => {
    if (index === currentDemo || !glRef.current) return;

    prevDemoRef.current = currentDemo;
    setCurrentDemo(index);
    
    const turn = (Math.PI / 2) * (index - prevDemoRef.current);
    
    // Update body class for global styles
    document.body.className = '';
    document.body.classList.add(options[index].class);
    
    // Animate scene rotation
    gsap.to(glRef.current.scene.rotation, {
      duration: 1.5,
      ease: "expo.inOut",
      y: `+=${turn}`,
    });
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 z-10">
        {options.map((option, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              currentDemo === index
                ? 'bg-white text-black font-bold'
                : 'bg-black text-white border border-white hover:bg-gray-800'
            }`}
            onClick={() => handleClick(index)}
          >
            {option.word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThreeDTextDemo;