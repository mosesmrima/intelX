const mongoose = require("mongoose");


const locationSchema = new mongoose.Schema({
    fqdn: { type: String, required: true },
    title: { type: String, default: '' },
    timeout: { type: Number, default: null },
    delay: { type: Number, default: null },
    version: { type: Number, required: true },
    slug: { type: String, required: true },
    available: { type: Boolean, default: true },
    updated: { type: Date, default: Date.now },
    lastScrape: { type: Date, default: Date.now }
});

const groupSchema = new mongoose.Schema({
    captcha: { type: Boolean, default: false },
    meta: { type: mongoose.Schema.Types.Mixed, default: null },
    locations: [locationSchema],
    profile: { type: Array, default: [] },
    ransomware_galaxy_value: { type: String, default: '' },
    name: { type: String}
});

const Group = mongoose.models.Group || mongoose.model('Group', groupSchema);
module.exports = Group;
