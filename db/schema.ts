import {sqliteTable,text,real,primaryKey,integer} from 'drizzle-orm/sqlite-core';
export const profiles=sqliteTable('profiles',{userId:text('user_id').primaryKey(),data:text('data').notNull()});
export const checks=sqliteTable('checks',{userId:text('user_id').notNull(),key:text('key').notNull(),done:integer('done').notNull()},t=>[primaryKey({columns:[t.userId,t.key]})]);
export const weights=sqliteTable('weights',{userId:text('user_id').notNull(),date:text('date').notNull(),weight:real('weight').notNull()},t=>[primaryKey({columns:[t.userId,t.date]})]);

export const exerciseChoices=sqliteTable('exercise_choices',{userId:text('user_id').notNull(),slot:text('slot').notNull(),mode:text('mode').notNull()},t=>[primaryKey({columns:[t.userId,t.slot]})]);

export const substitutions=sqliteTable('exercise_substitutions',{userId:text('user_id').notNull(),slot:text('slot').notNull(),exerciseId:text('exercise_id').notNull()},t=>[primaryKey({columns:[t.userId,t.slot]})]);

export const wellness=sqliteTable('wellness',{userId:text('user_id').notNull(),key:text('key').notNull(),data:text('data').notNull()},t=>[primaryKey({columns:[t.userId,t.key]})]);
