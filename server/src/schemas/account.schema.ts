import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;


@Schema()
export class Account {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  balance: string;

}

export const AccountSchema = SchemaFactory.createForClass(Account);