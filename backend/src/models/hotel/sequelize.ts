import { HotelRepository } from '.';
import { Hotel } from './hotel';
import { AddressSequelize, HotelSequelize} from "../../database";
import { Sequelize } from "sequelize/types";
import { DbError } from '../../exceptions/dbError';




export class HotelRepositorySequelize implements HotelRepository {
  sequelize: Sequelize['models']['Hotel']
  address: Sequelize['models']['Address'];
  
  constructor() {
    this.sequelize = HotelSequelize
  
    this.address = AddressSequelize
  }
  findByCnpj(cnpj: number): Promise<Hotel | undefined> {
    throw new Error('Method not implemented.');
  }
  async save(hotel: Hotel): Promise<void> {
    await this.address.create(hotel.address.data)
    await this.sequelize.create(hotel.data )
  }
  paginate(): Promise<Hotel[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Hotel> {
    const response = await this.sequelize.findByPk(id)
    if (response) {
      return new Hotel(response.toJSON())
    } else {
      throw new DbError('Endereço não encontrado')
    }
  }
 
  
  async delete(id: string): Promise<void> {
    await this.sequelize.destroy({
      where: {
        id: id,
    }})
  
  }
  async update(id: string, hotel: Hotel): Promise<void> {
    await this.sequelize.update(hotel.data, {
      where: {
        id: id,
      },
    })
  }
}

