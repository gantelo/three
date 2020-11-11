const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cameraMaxPosition = 200;
const initialLinePosition = 1;
const numberOfLines = 3500;
const distanceBetweenObjects = cameraMaxPosition / numberOfLines;

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, cameraMaxPosition);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const colors = [
  0x485696,
  0xe7e7e7,
  0xf9c784,
  0xfc7a1e,
  0xf24c00,
  0x12355b,
  0x420039,
  0xd72638,
  0xffffff,
  0xff570a,
];
const lenColors = colors.length;

const getColor = () => colors[Math.floor(Math.random() * 100) % lenColors];

const points = [];
points.push(new THREE.Vector3(0, -1, 0));
points.push(new THREE.Vector3(-1, 0, 0));
points.push(new THREE.Vector3(0, 1, 0));
points.push(new THREE.Vector3(1, 0, 0));
points.push(new THREE.Vector3(0, -1, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const lines = [];

for (let i = 0; i < numberOfLines; i++) {
  const material = new THREE.LineBasicMaterial();
  const line = new THREE.Line(geometry, material);
  line.position.z = i * distanceBetweenObjects;
  line.rotation.z = i * distanceBetweenObjects;
  lines.push(line);
}

lines.forEach((line) => scene.add(line));

function animate() {
  requestAnimationFrame(animate);
  lines.forEach((line) => {
    if (line.position.z > cameraMaxPosition) {
      line.position.z = initialLinePosition;
	  line.material.color = new THREE.Color(0xffffff * Math.random());
	  line.material.needsUpdate = true;
    }
    line.position.z += 0.05;
    line.rotation.z += 0.01;
  });
  renderer.render(scene, camera);
}

animate();
