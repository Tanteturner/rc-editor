import { Theme } from "../../models/theme";
import * as THREE from 'three';

export class Materials {
    constructor(theme: Theme) {
        this.setTheme(theme);
    }

    setTheme(theme: Theme) {
        this.pointMaterial = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color(theme.emphasis)
        });

        this.gridMaterial = new THREE.LineBasicMaterial({ 
        color: new THREE.Color(theme.secondary)
        });

        this.elementMaterials = [];

        this.elementMaterials.push(
            new THREE.MeshBasicMaterial( { 
                color: new THREE.Color(theme.primary)
            } )
        );

        this.elementMaterials.push(
            new THREE.MeshBasicMaterial( { 
                color: new THREE.Color(theme.danger)
            } )
        );

        this.elementMaterials.push(
            new THREE.MeshBasicMaterial( { 
                color: new THREE.Color(theme.warning)
            } )
        );

        this.elementMaterials.push(
            new THREE.MeshBasicMaterial( { 
                color: new THREE.Color(theme.success)
            } )
        );
    }

    pointMaterial!: THREE.MeshBasicMaterial;
    elementMaterials!: THREE.MeshBasicMaterial[];

    gridMaterial!: THREE.LineBasicMaterial;

    getElementMaterial(i: number): THREE.MeshBasicMaterial {
        return this.elementMaterials[i % this.elementMaterials.length];
    }
}