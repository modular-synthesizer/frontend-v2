// This value is kind of magic. It has been determined after trials and
// errors as the best value to apply to the wheel scroll to zoom in and
// out smoothly without it being too fast or too slow.
export const ZOOM_RATIO = 0.005;

// This value is the maximum value the ratio can be "zoomed out" with
// It is a magic value obtained after some trials and errors too.
export const MAX_ZOOM_OUT = 0.5;

// This value is the maximum value the ratio can be "zoomed in" with
// It is a magic value obtained after some trials and errors too.
export const MAX_ZOOM_IN = 2;