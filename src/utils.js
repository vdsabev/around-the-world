export const getOffset = (point, previousPoints, overlapDistance = 1) => {
  return previousPoints.reduce((offset, previousPoint) => {
    const distanceBetweenPoints = Math.sqrt(
      (point[0] - previousPoint[0]) ** 2 + (point[1] - previousPoint[1]) ** 2,
    )
    const pointsAreOverlapping = distanceBetweenPoints < overlapDistance
    return offset + (pointsAreOverlapping ? 1 : 0)
  }, 0)
}
