import { Component, OnInit } from '@angular/core';
import { InfiniteGridHelper } from './InfiniteGridHelper';
import * as THREE from 'three';
import { ThemeService } from '../../services/theme.service';
import { FileService } from '../../services/file.service';
import { openRollercoasterFile, TrackPoint } from '../../models/openRollercoasterFile.interface';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CanvasControlsComponent } from "../canvas-controls/canvas-controls.component";


@Component({
  selector: 'canvas-box',
  imports: [CanvasControlsComponent],
  templateUrl: './canvas-box.component.html',
  styleUrl: './canvas-box.component.scss'
})
export class CanvasBoxComponent implements OnInit {

  constructor(private themeservice: ThemeService, private fileService: FileService) { 
    fileService.getFile().subscribe( this.loadNewCoaster.bind(this) )

    this.pointMaterial = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color(themeservice.theme.primary)
    });

    this.pointGeometry = new THREE.SphereGeometry(0.05)

    this.gridMaterial = new THREE.LineBasicMaterial({ 
      color: new THREE.Color(themeservice.theme.secondary)
    });
  }

  ngOnInit(): void {
    this.initThreeJsBox();
  }

  scene: THREE.Scene = new THREE.Scene;
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  renderer?: THREE.WebGLRenderer;
  
  pointMaterial: THREE.MeshBasicMaterial;
  pointGeometry: THREE.SphereGeometry;

  gridMaterial: THREE.LineBasicMaterial;

  directionArrows: THREE.ArrowHelper[] = [];

  controls?: OrbitControls;

  setRendererSize(): void {
    const canvas = this.renderer?.domElement;
    if (!canvas) return;
  
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
  
    this.renderer?.setSize(width, height, false); // false = don't change canvas.style
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  initThreeJsBox(): void {
    const canvas = document.getElementById("canvas-box") as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer( {canvas, antialias: true, alpha: true } );
    this.setRendererSize();

    this.camera.position.z = 50;
    this.camera.position.y = 20;

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.addGrid();

    window.addEventListener('resize', () => this.setRendererSize());
    this.renderer.setAnimationLoop( this.update.bind(this) )
  }

  addGrid() {
    const grid = new InfiniteGridHelper(
      1,
      10,
      new THREE.Color(this.themeservice.theme.light),
      500
    );
    this.scene.add(grid);
  }

  clearScene() {
    this.directionArrows = [];
    this.scene.remove.apply(this.scene, this.scene.children);
  }

  createPoint(point: TrackPoint) {
    const pos = new THREE.Vector3(point.pos[0], point.pos[1], point.pos[2]);
    const up = new THREE.Vector3(point.up[0], point.up[1], point.up[2]);
    const right = new THREE.Vector3(point.right[0], point.right[1], point.right[2]);
    const forward = new THREE.Vector3(point.forward[0], point.forward[1], point.forward[2]);

    const pointMesh = new THREE.Mesh( this.pointGeometry, this.pointMaterial )

    pointMesh.position.set(pos.x,pos.y,pos.z);

    const upArrrow = new THREE.ArrowHelper( up, pos, 1, new THREE.Color( this.themeservice.theme.info ) );
    const rightArrrow = new THREE.ArrowHelper( right, pos, 1, new THREE.Color( this.themeservice.theme.danger ) );
    const forwardArrrow = new THREE.ArrowHelper( forward, pos, 1, new THREE.Color( this.themeservice.theme.warning ) );

    this.directionArrows.push(upArrrow, rightArrrow, forwardArrrow);

    this.scene.add( upArrrow, rightArrrow, forwardArrrow );
    this.scene.add(pointMesh);
  }

  loadNewCoaster(coaster: openRollercoasterFile) {
    this.clearScene();
    this.addGrid();

    coaster.trackPoints.forEach( point => {
      this.createPoint(point)
    });

    this.setDirectionArrowVisible(false);
  }

  setDirectionArrowVisible(visible: boolean) {
    this.directionArrows.forEach(arrow => {
      arrow.visible = visible;
    });
  }

  update(): void {
    this.controls?.update(0.01);
    this.renderer?.render( this.scene, this.camera );
  }
}
