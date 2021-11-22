import * as React from "react";
import { Crop } from "../../types/common";

interface Size {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

export const useEditor = (
  originalSize: Size,
  crop: Crop,
  onSave: (crop: Crop) => void
) => {
  const container = React.useRef<HTMLDivElement>(null);

  const [layoutSize, setLayoutSize] = React.useState<Size>({
    width: 560,
    height: 560,
  });

  const [touchStartPoint, startMove] = React.useState<Point>({ x: 0, y: 0 });
  const [touchPoint, setTouchPoint] = React.useState<Point>({ x: 0, y: 0 });
  const [positionPoint, setPositionPoint] = React.useState<Point>({
    x: (crop.anchor.x || 0) * layoutSize.width,
    y: (crop.anchor.y || 0) * layoutSize.height,
  });
  const [factor, setFactor] = React.useState(crop.factor || 100);
  const [isMoving, toggleMoving] = React.useState(false);

  const move = (p: Point) => {
    setTouchPoint({
      x: getTouchPositionX(p.x - touchStartPoint.x),
      y: getTouchPositionY(p.y - touchStartPoint.y),
    });
  };

  const stopMove = () => setTouchPoint({ x: 0, y: 0 });

  const commit = (p: Point) => {
    setPositionPoint(p);
    onSave({
      anchor: {
        x: p.x / layoutSize.width,
        y: p.y / layoutSize.height,
      },
      factor,
    });
  };

  const onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    toggleMoving(true);
    startMove({ x: e.touches[0].pageX, y: e.touches[0].pageY });
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    toggleMoving(true);
    startMove({ x: e.pageX, y: e.pageY });
  };

  const onTouchMove = (e: TouchEvent) =>
    move({ x: e.touches[0].pageX, y: e.touches[0].pageY });

  const onMounseMove = (e: MouseEvent) => {
    if (!isMoving) {
      return;
    }
    move({ x: e.pageX, y: e.pageY });
  };

  const onTouchEnd = () => {
    toggleMoving(false);
    commit({
      x: positionPoint.x + touchPoint.x,
      y: positionPoint.y + touchPoint.y,
    });
    stopMove();
  };

  const onMouseWheel = (e: WheelEvent) => {
    e.preventDefault();
    const minSize = getMinSize() * 100;
    const ds = (e.deltaY < 0 ? 1 : -1) * 5;
    const newSize = factor + ds;
    if (newSize < minSize) {
      setFactor(minSize);
      return;
    }
    const s = newSize / 100;
    const r = (s + ds / 100) / s;
    setFactor(newSize);
    commit({
      x: getBounceX(
        (positionPoint.x - layoutSize.width / 2) * r + layoutSize.width / 2,
        newSize
      ),
      y: getBounceY(
        (positionPoint.y - layoutSize.height / 2) * r + layoutSize.height / 2,
        newSize
      ),
    });
  };

  const getMinSize = () => {
    const ratio = layoutSize.width / layoutSize.height;
    const pratio =
      originalSize.width && originalSize.height
        ? originalSize.width / originalSize.height
        : 1;
    return Math.max(1, pratio / ratio);
  };

  const getTouchPositionX = (dx: number) => {
    const x = positionPoint.x + dx;
    const right = (-layoutSize.width * (factor - 100)) / 100;
    if (x > 0) return -positionPoint.x;
    if (x < right) return right - positionPoint.x;
    return dx;
  };

  const getTouchPositionY = (dy: number) => {
    const y = positionPoint.y + dy;
    const bottom =
      originalSize.width && originalSize.height
        ? layoutSize.height -
          (((originalSize.height * layoutSize.width) / originalSize.width) *
            factor) /
            100
        : 0;
    if (y > 0) return -positionPoint.y;
    if (y < bottom) return bottom - positionPoint.y;
    return dy;
  };

  const getBounceX = (x: number, size: number) => {
    const right = (-layoutSize.width * (size - 100)) / 100;
    if (x > 0) return 0;
    if (x < right) return right;
    return x;
  };

  const getBounceY = (y: number, size: number) => {
    const bottom =
      originalSize.width && originalSize.height
        ? layoutSize.height -
          (((originalSize.height * layoutSize.width) / originalSize.width) *
            size) /
            100
        : 0;
    if (y > 0) return 0;
    if (y < bottom) return bottom;
    return y;
  };

  const updateLyoutSize = () => {
    const el = container.current;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    setLayoutSize({
      width: rect.width,
      height: rect.height,
    });
    setPositionPoint({
      x: (crop.anchor.x || 0) * rect.width,
      y: (crop.anchor.y || 0) * rect.height,
    });
  };

  React.useEffect(() => {
    updateLyoutSize();
  }, []);

  React.useEffect(() => {
    if (!container.current) {
      return;
    }
    const el = container.current;
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("mousemove", onMounseMove);
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseup", onTouchEnd);
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    el.addEventListener("wheel", onMouseWheel);
    el.addEventListener("resize", updateLyoutSize);

    return () => {
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("mousemove", onMounseMove);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseup", onTouchEnd);
      el.removeEventListener("wheel", onMouseWheel);
      el.removeEventListener("resize", updateLyoutSize);
    };
  });

  const backgroundPosition = calcPosition(
    {
      anchor: {
        x: (positionPoint.x + touchPoint.x) / layoutSize.width,
        y: (positionPoint.y + touchPoint.y) / layoutSize.height,
      },
      factor,
    },
    originalSize
  );

  return {
    container,
    isMoving,
    backgroundPosition,
  };
};

function calcPosition(
  { anchor: { x, y }, factor }: Crop,
  { width, height }: Size
) {
  const r = width / height;

  const f = factor / 100;

  return {
    backgroundPositionX: `${div(-x, f - 1) * 100}%`,
    backgroundPositionY: `${div(-y, f / r - 1) * 100}%`,
    backgroundSize: `${factor}%`,
  };
}

const div = (n: number, d: number) => (d === 0 ? 0 : clamp(n / d));

const clamp = (x: number) => Math.max(Math.min(x, 1), 0);
