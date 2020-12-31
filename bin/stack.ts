#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EmojiStack } from '../lib/emoji-stack';

const app = new cdk.App();
new EmojiStack(app, 'EmojiAnnouncer');
