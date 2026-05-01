import { Event } from '../Models/event_entity.jsx';
import EventRepository from '../Repositories/event_repository.jsx';

export class EventController {
	constructor(repository = new EventRepository()) {
		this.repository = repository;
	}

	async create(data) {
		const event = new Event(data);
		return this.repository.create(event);
	}

	async update(id, data) {
		const event = new Event({ ...data, id });
		return this.repository.update(id, event);
	}

	async findById(id) {
		return this.repository.findById(id);
	}

	async findAll() {
		return this.repository.findAll();
	}

	async delete(id) {
		return this.repository.delete(id);
	}
}

export default EventController;