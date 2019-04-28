/**
 * @typedef ParticipantInfo
 * @property {integer} id
 * @property {Name.model}    name.required
 * @property {string} team.required
 */

/**
 * @typedef Name
 * @property {string} first.required
 * @property {string} last.required
 */

/**
 * @typedef ParticipantScore
 * @property {integer} id.required
 * @property {string}  name.required
 * @property {string} team.required,
 * @property {Array.<Score>} scores.required
 * @property {number} total.required
 */

/**
 * @typedef RotationEntry
 * @property {integer} id
 * @property {integer} participantId
 * @property {string} name.required
 * @property {string} team.required
 * @property {Apparatus.model} apparatus.required
 * @property {Score.model} score.required
 */


/**
 * @typedef RotationSession
 * @property {integer} onFloorParticipantId
 * @property {integer} scoreParticipantId
 */

/**
 * @typedef Apparatus
 * @property {enum} id.required - apparatus types - eg: 'floor', 'rope', 'hoop', 'ribbon'
 * @property {enum} imageurl.required -  urls pointing to images - eg: 'images/floor-min-2.png', 'images/rope-min-2.png', 'images/hoop-min-2.png', 'images/ribbon-min-2.png'
 */

/**
 * @typedef Score
 * @property {enum} id.required - type of score - eg: 'floor', 'rope', 'hoop', 'ribbon'
 * @property {number} diff.required  difficulty score
 * @property {number} exec.required  execution score
 * @property {number} deduct.required deduction score
 * @property {number} total.required total score
 */

/**
 * @typedef Error
 * @property {string} code.required
 */