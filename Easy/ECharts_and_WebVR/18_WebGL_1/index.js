/**
 * Created by Liming on 2017/2/27.
 */
"use strict";
(() => {
    //Canvas 画布
    let canvas = document.getElementById('canvas');

    //渲染器
    let renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    renderer.setClearColor(0x666666);

    //场景
    let scene = new THREE.Scene();

    //点光源
    let pointLight = new THREE.PointLight(0xffffff, 2, 50);  //主光源
    pointLight.position.set(10, 5, 3);
    scene.add(pointLight);
    let pointLight2 = new THREE.PointLight(0xffffff, .5, 20);  //补光
    pointLight2.position.set(-10, -5, -10);
    scene.add(pointLight2);

    //摄像机
    let angle = 0, center = new THREE.Vector3(0, 1, 0);
    let getCameraPosition = () => {
        ++angle >= 360 && (angle = 0);
        return new THREE.Vector3(
            center.x + 8 * Math.cos(Math.PI * angle / 180),
            5,
            center.z + 8 * Math.sin(Math.PI * angle / 180)
        );
    };
    let camera = new THREE.PerspectiveCamera(45, 1024 / 768, 1, 20);
    let position = getCameraPosition();
    camera.position.set(position.x, position.y, position.z);
    camera.lookAt(center);
    scene.add(camera);

    //绘制小车
    let drawCar = (position, scale, scene) => {
        //材质
        let material = new THREE.MeshLambertMaterial({
            color: 0x00ff00
        });

        //车身
        let body = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 2), material);
        body.position.set(position.x, position.y, position.z);
        scene.add(body);

        //车轮
        let wheel = (x, y, z) => {
            let obj = new THREE.Mesh(new THREE.TorusGeometry(.4, .2, 12, 18), material);
            obj.position.set(x, y, z);
            return obj;
        };
        scene.add(wheel(position.x - 1, position.y - 1, position.z - 1));
        scene.add(wheel(position.x - 1, position.y - 1, position.z + 1));
        scene.add(wheel(position.x + 1, position.y - 1, position.z - 1));
        scene.add(wheel(position.x + 1, position.y - 1, position.z + 1));
    };
    drawCar(center, 1, scene);

    //渲染
    renderer.render(scene, camera);

    //帧数
    let fps = document.getElementById('fps');
    let lastTime = Date.now();
    let count = 0;

    //摄像机旋转
    let draw = () => {
        //旋转
        let position = getCameraPosition();
        camera.position.set(position.x, position.y, position.z);
        camera.lookAt(center);

        //渲染
        renderer.render(scene, camera);

        //计算帧数
        let t = Date.now();
        ++count;
        if(t - lastTime > 500) {
            fps.innerHTML = (count / (t - lastTime) * 1000).toFixed(2) + ' FPS';
            lastTime = t;
            count = 0;
        }
        requestAnimationFrame ? requestAnimationFrame(draw) :
            webkitRequestAnimationFrame ? webkitRequestAnimationFrame(draw, canvas) :
                mozRequestAnimationFrame ? mozRequestAnimationFrame(draw) :
                    msRequestAnimationFrame ? msRequestAnimationFrame(draw) :
                        oRequestAnimationFrame ? oRequestAnimationFrame(draw) :
                            setTimeout(draw, 100);
    };
    draw();
})();
