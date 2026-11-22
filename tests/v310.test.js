import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { UI_FONTS } from '../src/ui-fonts.js';
import { sanitizePrefReminders, dueReminders, reminderText } from '../src/preferred-reminders.js';
import { readText } from './helpers/read-text.js';
import { preferredWindow } from '../src/preferred-times.js';
const app = readText('../src/app.js', import.meta.url);
const html = readText('../index.html', import.meta.url);
const css = readText('../src/styles.css', import.meta.url);

test('3.1.0 themes and offline font options extend rather than replace existing choices', () => {
  const themes = app.slice(app.indexOf('const THEMES = ['), app.indexOf('const VOLUNTARY = ['));
  assert.equal((themes.match(/\['[^']+', '(?:dark|light)'/g) || []).length, 20);
  assert.equal((themes.match(/'dark'/g) || []).length, 10);
  assert.equal((themes.match(/'light'/g) || []).length, 10);
  assert.equal(UI_FONTS.length, 30);
  assert.equal(new Set(UI_FONTS.map(f => f.id)).size, 30);
  for (const font of UI_FONTS.slice(10)) {
    assert.ok(font.en && /[\u0980-\u09ff]/.test(font.bn));
    const file = font.id + '.woff2';
    assert.ok(fs.statSync(new URL('../src/fonts/ui/' + file, import.meta.url)).size > 1000);
    assert.ok(css.includes(`fonts/ui/${file}`));
  }
});

test('3.1.0 preferred reminders preserve zero and fire at the exact start and end', () => {
  const start = new Date('2026-11-22T06:00:00');
  const end = new Date('2026-11-22T08:00:00');
  const cfg = sanitizePrefReminders({ begin: {enabled:true, minutes:{fajr:0}}, end:{enabled:true,minutes:{fajr:0}} }, ['fajr']);
  assert.equal(cfg.begin.minutes.fajr, 0);
  assert.equal(cfg.end.minutes.fajr, 0);
  // Prefer using a real Fajr event (the preferredWindow calculation determines its boundary).
  const events = [{key:'fajr',date:new Date('2026-11-22T12:00:00'),start,end}];
  const sent = {};
  const dayKeyOf = () => '2026-11-22';
  const pref = preferredWindow('fajr', start, end);
  const near = dueReminders({now:pref.start,events,config:cfg,sent,dayKeyOf});
  assert.equal(near.length, 1);
  assert.equal(near[0].kind, 'begin');
  assert.equal(near[0].minutes, 0);
  assert.match(reminderText(near[0], {bn:false,name:'Fajr',time:()=> '6:00 AM',num:String}).title,/begins now/);
  const atEnd = dueReminders({now:pref.end,events,config:cfg,sent,dayKeyOf});
  assert.equal(atEnd.length, 1);
  assert.equal(atEnd[0].kind, 'end');
  assert.equal(new Set([...near,...atEnd].map(x=>x.id)).size,2);
});

test('3.1.0 Friday has exclusive Fard choices and correct recorded rakah count', () => {
  assert.match(app,/data-friday-choice/);
  assert.match(app,/\['jumuah', 'dhuhr'\]\.map/);
  assert.match(app,/record\.fridayFardChoice === 'jumuah' \? 2 : 4/);
  assert.match(app,/function toggleFridayFard/);
  assert.match(app,/record\.fridayFardChoice = choice/);
  assert.doesNotMatch(html,/id="reviseSection"/);
  assert.match(app,/A Blessed Reminder/);
  assert.match(css,/countdown-card \.countdown-card-value \{ font-family: var\(--ui-font\)/);
});
