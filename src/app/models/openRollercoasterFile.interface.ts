export interface openRollercoasterFile {
    header: orcfHeader
    trackPoints: TrackPoint[]
    trackElements: TrackElement[]
}

export interface TrackElement {
    type: string
    startIndex: number
    endIndex: number
}

export interface TrackPoint {
    pos: number[]
    up: number[]
    right: number[]
    forward: number[]
}

export interface orcfHeader {
    version: string
}