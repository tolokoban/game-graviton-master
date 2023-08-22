import { Vector2, subtractVectors } from "@tolokoban/tgd"

type Polygon = Segment[]

interface Segment {
    point: Vector2
    vector: Vector2
}

export default class Level {
    private readonly polygons: Polygon[] = []

    public hit = false
    public hitX = 0
    public hitY = 0

    addPoly(points: Vector2[]) {
        const poly: Polygon = []
        for (let i = 0; i < points.length; i++) {
            const a = points[i]
            const b = points[(i + 1) % points.length]
            poly.push({
                point: a,
                vector: subtractVectors(b, a),
            })
        }
        this.polygons.push(poly)
    }

    hitTest(from: Vector2, to: Vector2) {}

    private intersectionTest(segmentA: Segment, segmentB: Segment) {
        this.hit = false
        const {
            point: [ax, ay],
            vector: [AX, AY],
        } = segmentA
        const {
            point: [bx, by],
            vector: [BX, BY],
        } = segmentB
        const denom = AY * BX - AX * BY
        if (denom < 1e-9) return

        const u = by * BX - bx * BY + ax * BY - ay * BX
        if (denom > 0 && (u < 0 || u > denom)) return
        if (denom < 0 && (u > 0 || u < denom)) return

        const v = ax * AY - ay * AX + AX * by - AY * bx
        if (denom > 0 && (v < 0 || v > denom)) return
        if (denom < 0 && (v > 0 || v < denom)) return

        const factor = u / denom
        this.hit = true
        this.hitX = ax + factor * AX
        this.hitY = ay + factor * AY
    }
}
