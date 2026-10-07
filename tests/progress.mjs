import assert from 'node:assert/strict';
import {streaks} from '../lib/progress.ts';
const data={'workout/2026-08-30':{done:true},'movement/2026-08-31/walk':{done:true},'workout/2026-09-01':{done:true},'movement/2026-09-01/desk':{done:true},'workout/2026-09-02':{done:false}};
assert.deepEqual(streaks({},'2026-09-01'),{best:0,current:0,dates:[]});
assert.equal(streaks(data,'2026-09-02').current,3);
assert.equal(streaks(data,'2026-09-03').current,0);
assert.equal(streaks(data,'2026-09-03').best,3);
assert.equal(streaks({'workout/2026-12-31':{done:true},'workout/2027-01-01':{done:true}},'2027-01-01').current,2);
console.log('Streak checks passed: empty, deduplication, undo, month/year boundaries, yesterday and broken streak.');
