const imageTopics = {
  fever: [
    'photo-1584308666744-24d5c474f2ae',
    'photo-1559757175-0eb30cd8c063',
    'photo-1576091160550-2173dba999ef',
    'photo-1631815589968-fdb09a223b1e',
  ],
  cold: [
    'photo-1547489432-cf93fa6c71ee',
    'photo-1556909114-f6e7ad7d3136',
    'photo-1544991875-5dc1b05f1754',
    'photo-1614467559943-c69f2c5f0f30',
  ],
  headache: [
    'photo-1506126613408-eca07ce68773',
    'photo-1584308666744-24d5c474f2ae',
    'photo-1541199249251-f713e6145474',
    'photo-1512678080530-7760d81faba6',
  ],
  stomach: [
    'photo-1576671081837-49000212a370',
    'photo-1556909114-f6e7ad7d3136',
    'photo-1490645935967-10de6ba17061',
    'photo-1547592180-85f173990554',
  ],
  sleep: [
    'photo-1541199249251-f713e6145474',
    'photo-1512678080530-7760d81faba6',
    'photo-1499728603263-13726abce5fd',
    'photo-1455849318743-b2233052fcff',
  ],
  tooth: [
    'photo-1609840114035-3c981b782dfe',
    'photo-1606811841689-23dfddce3e95',
    'photo-1579154341098-e4e158cc7f55',
    'photo-1588776814546-1ffbb172ca71',
  ],
  blood: [
    'photo-1576091160399-112ba8d25d1d',
    'photo-1559757148-5c350d0d3c56',
    'photo-1631815589968-fdb09a223b1e',
    'photo-1584308666744-24d5c474f2ae',
  ],
  skin: [
    'photo-1556228578-8c89e6adf883',
    'photo-1526256262350-7da7584cf5eb',
    'photo-1622253692010-333f2da6031d',
    'photo-1576671081837-49000212a370',
  ],
  default: [
    'photo-1584308666744-24d5c474f2ae',
    'photo-1576091160399-112ba8d25d1d',
    'photo-1559757148-5c350d0d3c56',
    'photo-1631815589968-fdb09a223b1e',
  ],
};

export function getImagesForQuery(query) {
  const q = (query || '').toLowerCase();

  if (/fever|temperature|hot|chills|thermometer/.test(q)) return imageTopics.fever;
  if (/cold|cough|flu|throat|sneeze|runny|congestion/.test(q)) return imageTopics.cold;
  if (/headache|migraine|head pain|head ache/.test(q)) return imageTopics.headache;
  if (/stomach|nausea|vomit|digest|gastro|diarrhea|abdomen|belly/.test(q)) return imageTopics.stomach;
  if (/sleep|insomnia|tired|fatigue|rest|drowsy/.test(q)) return imageTopics.sleep;
  if (/tooth|dental|gum|cavity|mouth/.test(q)) return imageTopics.tooth;
  if (/blood|pressure|heart|cardio|hypertension/.test(q)) return imageTopics.blood;
  if (/skin|rash|itch|allerg|hive|eczema/.test(q)) return imageTopics.skin;

  return imageTopics.default;
}

export function buildImageUrl(photoId) {
  return `https://images.unsplash.com/photo-${photoId}?w=300&q=80`;
}
