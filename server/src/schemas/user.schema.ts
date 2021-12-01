import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  giuEmail: string;

  @Prop({required: true})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  giuID: number;

  @Prop({required: true})
  phone: string;

}
//module.exports = Users = mongoose.model('Useres', User);
export const UserSchema = SchemaFactory.createForClass(User);