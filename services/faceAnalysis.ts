import * as tf from "@tensorflow/tfjs";
import * as faceapi from "face-api.js";

export class FaceAnalysisService {
  private isInitialized = false;
  private videoElement: HTMLVideoElement | null = null;

  async initialize() {
    if (this.isInitialized) return;

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]);

    this.isInitialized = true;
  }

  async startVideoAnalysis(videoElement: HTMLVideoElement) {
    this.videoElement = videoElement;
    await this.initialize();

    const canvas = faceapi.createCanvasFromMedia(videoElement);
    document.body.append(canvas);

    const displaySize = {
      width: videoElement.width,
      height: videoElement.height,
    };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      this.processDetections(resizedDetections);
    }, 100);
  }

  private processDetections(detections: any[]) {
    if (!detections.length) return;

    const metrics = detections.reduce(
      (acc, detection) => {
        const expressions = detection.expressions;
        acc.attention += expressions.neutral;
        acc.engagement += expressions.happy + expressions.surprised;
        acc.confusion += expressions.confused + expressions.angry;
        return acc;
      },
      { attention: 0, engagement: 0, confusion: 0 }
    );

    // Normalize metrics
    const total = detections.length;
    return {
      attention: metrics.attention / total,
      engagement: metrics.engagement / total,
      confusion: metrics.confusion / total,
      timestamp: Date.now(),
    };
  }
}
