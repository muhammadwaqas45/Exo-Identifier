// This file extends the global JSX namespace to include A-Frame elements.
// FIX: Reverting to a simpler declaration without a React import. This prevents
// module-scoping conflicts that were causing the base JSX types (like JSX.Element)
// to be overwritten. Using `any` provides flexibility for A-Frame's attribute-based API
// and resolves all related compilation errors.

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-entity': any;
      'a-box': any;
      'a-sphere': any;
      'a-torus': any;
      'a-camera': any;
      'a-sky': any;
      'a-assets': any;
      'a-plane': any;
      'a-text': any;
      'a-animation': any;
      'a-dodecahedron': any;
    }
  }
}
