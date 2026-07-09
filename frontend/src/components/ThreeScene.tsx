"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

type ThreeSceneVariant = "orbital" | "prism" | "helix" | "stack" | "constellation";

interface ThreeSceneProps {
  variant?: ThreeSceneVariant;
  className?: string;
}

interface BuiltScene {
  root: THREE.Group;
  cameraZ: number;
  update: (elapsed: number) => void;
}

const COLORS = {
  primary: 0xd62133,
  hotRed: 0xff4055,
  cyan: 0x47d8ff,
  amber: 0xffc857,
  white: 0xffffff,
};

const meshMaterial = (color: number, opacity = 0.55, emissive = color) =>
  new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.25,
    metalness: 0.62,
    opacity,
    roughness: 0.34,
    transparent: opacity < 1,
  });

const lineMaterial = (color: number, opacity = 0.45) =>
  new THREE.LineBasicMaterial({
    color,
    opacity,
    transparent: true,
  });

const edgeShell = (geometry: THREE.BufferGeometry, color = COLORS.white, opacity = 0.35) =>
  new THREE.LineSegments(new THREE.EdgesGeometry(geometry), lineMaterial(color, opacity));

const buildOrbital = (): BuiltScene => {
  const root = new THREE.Group();
  const satellites = new THREE.Group();
  const coreGeometry = new THREE.IcosahedronGeometry(1.05, 1);
  const core = new THREE.Mesh(coreGeometry, meshMaterial(COLORS.primary, 0.62));
  const shell = edgeShell(coreGeometry, COLORS.white, 0.4);
  shell.scale.setScalar(1.02);
  root.add(core, shell);

  const ringRotations = [
    [Math.PI / 2, 0, 0],
    [0.8, 0.3, Math.PI / 2],
    [0.2, Math.PI / 2, 0.6],
  ];

  ringRotations.forEach((rotation, index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.72 + index * 0.18, 0.012, 10, 128),
      meshMaterial(index === 1 ? COLORS.cyan : COLORS.primary, 0.48)
    );
    ring.rotation.set(rotation[0], rotation[1], rotation[2]);
    root.add(ring);
  });

  for (let i = 0; i < 7; i += 1) {
    const angle = (i / 7) * Math.PI * 2;
    const satellite = new THREE.Mesh(
      new THREE.SphereGeometry(i % 2 === 0 ? 0.075 : 0.055, 16, 16),
      meshMaterial(i % 2 === 0 ? COLORS.cyan : COLORS.amber, 0.85)
    );
    satellite.position.set(Math.cos(angle) * 2.05, Math.sin(angle * 1.3) * 0.38, Math.sin(angle) * 2.05);
    satellites.add(satellite);
  }

  root.add(satellites);

  return {
    root,
    cameraZ: 6,
    update: (elapsed) => {
      root.rotation.y = elapsed * 0.22;
      root.rotation.x = Math.sin(elapsed * 0.38) * 0.18;
      core.rotation.y = elapsed * 0.7;
      satellites.rotation.y = elapsed * 0.82;
    },
  };
};

const buildPrism = (): BuiltScene => {
  const root = new THREE.Group();
  const prismGeometry = new THREE.OctahedronGeometry(1.05, 0);
  const prism = new THREE.Mesh(prismGeometry, meshMaterial(COLORS.cyan, 0.45, COLORS.primary));
  const prismEdges = edgeShell(prismGeometry, COLORS.cyan, 0.72);
  root.add(prism, prismEdges);

  const upper = new THREE.Mesh(
    new THREE.ConeGeometry(0.52, 1.1, 4),
    meshMaterial(COLORS.primary, 0.42)
  );
  upper.position.y = 1.02;
  upper.rotation.y = Math.PI / 4;
  root.add(upper);

  const lower = upper.clone();
  lower.position.y = -1.02;
  lower.rotation.x = Math.PI;
  root.add(lower);

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.45, 0.025, 120, 10, 2, 5),
    meshMaterial(COLORS.amber, 0.48, COLORS.amber)
  );
  root.add(knot);

  return {
    root,
    cameraZ: 5.4,
    update: (elapsed) => {
      root.rotation.y = elapsed * 0.34;
      root.rotation.z = Math.sin(elapsed * 0.35) * 0.16;
      knot.rotation.x = elapsed * 0.45;
    },
  };
};

const buildHelix = (): BuiltScene => {
  const root = new THREE.Group();
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= 90; i += 1) {
    const progress = i / 90;
    const angle = progress * Math.PI * 5;
    points.push(new THREE.Vector3(Math.cos(angle) * 0.95, (progress - 0.5) * 3.2, Math.sin(angle) * 0.95));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 140, 0.018, 8, false),
    meshMaterial(COLORS.primary, 0.72)
  );
  root.add(tube);

  for (let i = 0; i < points.length; i += 9) {
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 14, 14),
      meshMaterial(i % 3 === 0 ? COLORS.cyan : COLORS.white, 0.82)
    );
    node.position.copy(points[i]);
    root.add(node);
  }

  return {
    root,
    cameraZ: 5.8,
    update: (elapsed) => {
      root.rotation.y = elapsed * 0.38;
      root.rotation.x = Math.sin(elapsed * 0.45) * 0.25;
    },
  };
};

const buildStack = (): BuiltScene => {
  const root = new THREE.Group();

  for (let i = 0; i < 6; i += 1) {
    const size = 1.75 - i * 0.17;
    const geometry = new THREE.BoxGeometry(size, 0.16, size);
    const layer = new THREE.Mesh(geometry, meshMaterial(i % 2 === 0 ? COLORS.primary : COLORS.cyan, 0.24));
    layer.position.y = (i - 2.5) * 0.34;
    layer.rotation.y = i * 0.25;
    const edges = edgeShell(geometry, i % 2 === 0 ? COLORS.white : COLORS.cyan, 0.44);
    edges.position.copy(layer.position);
    edges.rotation.copy(layer.rotation);
    root.add(layer, edges);
  }

  const cap = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.58, 0),
    meshMaterial(COLORS.amber, 0.5, COLORS.primary)
  );
  cap.position.y = 1.38;
  root.add(cap, edgeShell(cap.geometry, COLORS.amber, 0.56));

  return {
    root,
    cameraZ: 5.5,
    update: (elapsed) => {
      root.rotation.y = elapsed * 0.28;
      root.rotation.x = -0.35 + Math.sin(elapsed * 0.35) * 0.08;
      cap.rotation.y = elapsed * 0.75;
    },
  };
};

const buildConstellation = (): BuiltScene => {
  const root = new THREE.Group();
  const nodes = [
    new THREE.Vector3(-1.35, -0.65, 0.15),
    new THREE.Vector3(-0.72, 0.76, -0.35),
    new THREE.Vector3(0.18, -0.18, 0.48),
    new THREE.Vector3(0.84, 0.82, -0.12),
    new THREE.Vector3(1.38, -0.44, 0.2),
    new THREE.Vector3(-0.08, 1.42, 0.15),
  ];
  const connections = [0, 1, 1, 2, 2, 3, 2, 4, 3, 5, 0, 2, 4, 5];
  const positions: number[] = [];

  connections.forEach((nodeIndex) => {
    const point = nodes[nodeIndex];
    positions.push(point.x, point.y, point.z);
  });

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  root.add(new THREE.LineSegments(lineGeometry, lineMaterial(COLORS.cyan, 0.42)));

  nodes.forEach((point, index) => {
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(index === 2 ? 0.13 : 0.09, 18, 18),
      meshMaterial(index === 2 ? COLORS.primary : COLORS.white, 0.82)
    );
    node.position.copy(point);
    root.add(node);
  });

  return {
    root,
    cameraZ: 5,
    update: (elapsed) => {
      root.rotation.y = elapsed * 0.3;
      root.rotation.x = Math.sin(elapsed * 0.4) * 0.18;
    },
  };
};

const buildScene = (variant: ThreeSceneVariant): BuiltScene => {
  switch (variant) {
    case "prism":
      return buildPrism();
    case "helix":
      return buildHelix();
    case "stack":
      return buildStack();
    case "constellation":
      return buildConstellation();
    case "orbital":
    default:
      return buildOrbital();
  }
};

const disposeScene = (scene: THREE.Scene) => {
  scene.traverse((object) => {
    const disposable = object as THREE.Object3D & {
      geometry?: THREE.BufferGeometry;
      material?: THREE.Material | THREE.Material[];
    };

    disposable.geometry?.dispose();

    if (Array.isArray(disposable.material)) {
      disposable.material.forEach((material) => material.dispose());
    } else {
      disposable.material?.dispose();
    }
  });
};

const ThreeScene = ({ variant = "orbital", className }: ThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const builtScene = buildScene(variant);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const observer = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    let frameId = 0;

    camera.position.set(0, 0, builtScene.cameraZ);
    scene.add(builtScene.root);
    scene.add(new THREE.AmbientLight(COLORS.white, 0.72));

    const redLight = new THREE.PointLight(COLORS.primary, 3.4, 12);
    redLight.position.set(3, 2.5, 4);
    scene.add(redLight);

    const coolLight = new THREE.PointLight(COLORS.cyan, 1.2, 10);
    coolLight.position.set(-3, -1.5, 3);
    scene.add(coolLight);

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.domElement.dataset.sceneVariant = variant;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.width = "100%";
    container.appendChild(renderer.domElement);

    observer.observe(container);

    const render = (elapsedMs = 0) => {
      builtScene.update(elapsedMs / 1000);
      renderer.render(scene, camera);
    };

    const animate = (elapsedMs: number) => {
      render(elapsedMs);
      frameId = requestAnimationFrame(animate);
    };

    render();

    if (!reducedMotion) {
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
      disposeScene(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none select-none", className)}
      data-three-scene-container={variant}
      aria-hidden="true"
    />
  );
};

export default ThreeScene;
