import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  giuEmail: String;

  @Prop({required: true})
  username: String;

  @Prop({required: true})
  password: String;

  @Prop({required: true})
  giuID: number;

  @Prop({required: true})
  phone: String;

}
//module.exports = Users = mongoose.model('Useres', User);
export const UserSchema = SchemaFactory.createForClass(User);