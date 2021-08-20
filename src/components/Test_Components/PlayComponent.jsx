/**
 * @author Zhicheng Wang
 * @create date 2021-08-14 15:43:22
 * @modify date 2021-08-14 15:43:22
 */
import React from 'react';
// import React, { Component } from 'react';
// import { useEffect } from 'react';

const Play = (props) => {


    return (
        <div id="unity-container" class="unity-desktop">
            <canvas id="unity-canvas"></canvas>
            <div id="unity-loading-bar">
                <div id="unity-logo"></div>
                <div id="unity-progress-bar-empty">
                    <div id="unity-progress-bar-full"></div>
                </div>
            </div>
            <div id="unity-mobile-warning">
                WebGL builds are not supported on mobile devices.
            </div>
            <div id="unity-footer">
                <div id="unity-webgl-logo"></div>
                <div id="unity-fullscreen-button"></div>
                <div id="unity-build-title">XiaochuanJ_Bird_Project</div>
            </div>
        </div>
    )

}

export default Play;