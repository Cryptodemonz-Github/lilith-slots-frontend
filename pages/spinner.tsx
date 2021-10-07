import React, { useEffect } from "react";
import demonzface from "../styles/assets/demonzface.png";

import Image from "next/image";
import "../styles/Home.module.css";
import { useSpring, animated, Controller } from "react-spring";
import * as easings from "d3-ease";
import { useState } from "react";

function Spinner() {
  const animations = useSpring({
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    loop: true,
  });

  return (
    <animated.div
      style={{
        width: 100,
        height: 100,
        borderRadius: 0,
        ...animations,
      }}
    >
      <Image className="wheel" height="100px" width="100px" src={demonzface} />
    </animated.div>
  );
}

export default Spinner;
