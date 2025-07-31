// /components/shaders/dissolveShader.ts
export const vertexShader = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  varying vec3 vPos;
  uniform float uProgress;
  uniform float uEdge;
  uniform vec3 uEdgeColor;
  uniform float uNoiseFreq;

  // Simple 3D noise function (replace with optimized GLSL noise if needed)
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n = mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                      mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                  mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                      mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
    return n;
  }

  void main() {
    float n = noise(vPos * uNoiseFreq);

    if (n < uProgress) discard;

    float edgeStart = uProgress;
    float edgeEnd = uProgress + uEdge;

    if (n >= edgeStart && n < edgeEnd) {
      gl_FragColor = vec4(uEdgeColor, 1.0);
      return;
    }

    // Otherwise use base material color
    gl_FragColor = vec4(1.0); // Will be overwritten by CustomShaderMaterial base
  }
`;
