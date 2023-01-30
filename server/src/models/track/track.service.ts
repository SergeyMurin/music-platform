import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Track } from './track.entity';
import validator from 'validator';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TRACK_REPOSITORY')
    private trackRepository: typeof Track,
  ) {}

  async getEntityByPK(pk) {
    const trackEntity = await this.trackRepository.findByPk(pk);
    return trackEntity;
  }

  async findAll(request, response): Promise<Track[]> {
    const trackEntities = await this.trackRepository.findAll<Track>();
    const data = trackEntities.map((trackEntity) => trackEntity.dataValues);
    return response.status(HttpStatus.OK).send({ data: data });
  }

  async uploadTrack(request, response): Promise<any> {
    try {
      await Track.create({
        title: 'track3',
      });

      response.status(HttpStatus.CREATED).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: error.message });
    }
  }

  async removeTrack(request, response, uuid: string): Promise<any> {
    enum ErrorMessage {
      NoId = 'No such id',
      NotValidId = 'Not valid id',
    }

    if (!validator.isUUID(uuid, 4)) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: ErrorMessage.NotValidId });
    }

    const track: Track = await this.trackRepository.findByPk(uuid);
    if (!track) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: ErrorMessage.NoId });
    }

    await track.destroy();
    return response.status(HttpStatus.OK).send();
  }
}
