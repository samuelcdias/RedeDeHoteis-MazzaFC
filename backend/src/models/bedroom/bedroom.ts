import { uuid } from '../../helpers/uuid'


export enum BedroomStatus {
  UNAVAILABLE = 1
}

export enum BedroomType {
  NOT_DEFINED = 1
}


export type BedroomConstructor = {
  id?: string
  name?: string
  floor:string
  hotel_id: string
  position_x?: number | null
  position_y?: number | null
  status_room_id?: BedroomStatus
  room_type_id?: BedroomType
}


export class Bedroom {
  id: string
  name: string
  floor: string
  hotel_id: string
  position_x: number | null 
  position_y: number | null
  status_room_id: BedroomStatus
  room_type_id: BedroomType

  constructor(props: BedroomConstructor) {
    this.id = props.id || uuid()
    this.name = props.name || ''
    this.floor = props.floor
    this.hotel_id = props.hotel_id
    this.position_x = props.position_x  ?? null
    this.position_y = props.position_y ?? null
    this.status_room_id = props.status_room_id || BedroomStatus.UNAVAILABLE
    this.room_type_id = props.room_type_id || BedroomType.NOT_DEFINED


  }

  get publicInfo(){
    return{
      id : this.id ,
      name : this.name,
      floor: this.floor,
      hotel_id : this.hotel_id,
      position_x : this.position_x,
      position_y : this.position_y,
      status_room_id : this.status_room_id,
      room_type_id : this.room_type_id
    }
  }
  get data() {
    return {
      id: this.id,
      name: this.name,
      floor: this.floor,
      hotel_id: this.hotel_id,
      position_x: this.position_x,
      position_y: this.position_y,
      status_room_id : this.status_room_id,
      room_type_id : this.room_type_id
    }
  }
  static filter() {
    return ['id', 'name', 'floor', 'hotel_id', 'status_room_id', 'room_type_id']
  }
  static fields(){
    return ['id', 'name', 'floor', 'hotel_id', 'position_x', 'position_y', 'status_room_id', 'room_type_id']
  }

}
