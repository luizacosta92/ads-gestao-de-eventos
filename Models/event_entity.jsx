/**
 * Event Entity
 * Represents an event in the event management system
 */

export class Event {
  constructor(data = {}) {
    this.id = data.id ?? null;
    this.managerId = data.managerId ?? null;
    this.groomName = data.groomName ?? '';
    this.brideName = data.brideName ?? '';
    this.groomPhone = data.groomPhone ?? null;
    this.bridePhone = data.bridePhone ?? null;
    this.groomEmail = data.groomEmail ?? null;
    this.brideEmail = data.brideEmail ?? null;
    this.ceremonyType = data.ceremonyType ?? null;
    this.ceremonyVenue = data.ceremonyVenue ?? null;
    this.ceremonyDatetime = data.ceremonyDatetime ?? null;
    this.receptionVenue = data.receptionVenue ?? null;
    this.receptionDatetime = data.receptionDatetime ?? null;
    this.officiant = data.officiant ?? null;
    this.legalAssistance = data.legalAssistance ?? null;
    this.groomsmenCount = data.groomsmenCount ?? null;
    this.bridesmaidsCount = data.bridesmaidsCount ?? null;
    this.guestCount = data.guestCount ?? null;
    this.decoration = data.decoration ?? null;
    this.music = data.music ?? null;
    this.catering = data.catering ?? null;
    this.cake = data.cake ?? null;
    this.beverages = data.beverages ?? null;
    this.photoVideo = data.photoVideo ?? null;
    this.partyFavor = data.partyFavor ?? null;
    this.invitation = data.invitation ?? null;
    this.budget = data.budget ?? null;
    this.status = data.status ?? 'planning';
    this.createdAt = data.createdAt ?? null;
    this.updatedAt = data.updatedAt ?? null;
  }

  /**
   * Valid statuses for an event
   */
  static STATUSES = {
    PLANNING: 'planning',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  };

  /**
   * Validates if the status is valid
   */
  isValidStatus(status) {
    return Object.values(Event.STATUSES).includes(status);
  }
}

export default Event;
