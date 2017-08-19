import * as moment from "moment";

export interface IBasePugPhaseStrategy {
    getExpiryDateTime(): moment.Moment;
}
