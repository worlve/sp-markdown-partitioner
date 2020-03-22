export enum PatritionType {
  Header1 = 'h1',
  Header2 = 'h2',
  Header3 = 'h3',
  Header4 = 'h4',
  Header5 = 'h5',
  Header6 = 'h6',
  Paragraph = 'p',
  Text = 'text',
  Bold = 'bold',
  Italics = 'italics',
  Link = 'link',
  Relation = 'relation',
  Color = 'color',
  UnorderedList = 'ul',
  OrderedList = 'ol',
  Image = 'image',
  PageBreak = 'hr',
  Quoteblock = 'quotes',
}

export class Partition {
  type: PatritionType;
  private _value?: string;
  private _partitions?: Partition[]; 

  constructor(type: PatritionType) {
    this.type = type;
  }

  set value(value: string) {
    if (this.hasPartitions) {
      throw new Error(`cannot have both value and partitions set`);
    }
    this._value = value;
  }

  set partitions(partitions: Partition[]) {
    if (this.hasValue) {
      throw new Error(`cannot have both value and partitions set`);
    }
    this._partitions = partitions;
  }

  get value():string {
    if (this._value === undefined) {
      throw new Error(`value is not set`);
    }
    return this._value;
  }

  get partitions():Partition[] {
    if (this._partitions === undefined) {
      throw new Error(`partitions is not set`);
    }
    return this._partitions;
  }

  get hasPartitions():boolean {
    return this._partitions !== undefined;
  }

  get hasValue():boolean {
    return this._value !== undefined;
  }

  copy():Partition {
    throw new Error(`cannot copy base class`);
  }

  protected setCopyProperties(copyPartition: Partition):Partition {
    if (this.hasPartitions) {
      copyPartition.partitions = this.partitions;
    }
    if (this.hasValue) {
      copyPartition.value = this.value;
    }
    return copyPartition;
  }

  json():any {
    if (this.hasValue) {
      return {
        type: this.type,
        value: this.value
      };
    }
    if (this.hasPartitions) {
      return {
        type: this.type,
        partitions: this.jsonPartitions(this.partitions),
      }
    }
    return {
      type: this.type
    };
  }

  protected jsonPartitions(partitions: Partition[]):any[] {
    const partitionsData = [];
    for (const partition of partitions) {
      partitionsData.push(partition.json());
    }
    return partitionsData;
  }
}

class PartitionHeader extends Partition {
  constructor(type: PatritionType, value: string) {
    super(type);
    this.value = value;
  }
}

export class PartitionHeader1 extends PartitionHeader {
  constructor(value: string) {
    super(PatritionType.Header1, value);
  }

  copy():PartitionHeader1 {
    return new PartitionHeader1(this.value);
  }
}

export class PartitionHeader2 extends PartitionHeader {
  constructor(value: string) {
    super(PatritionType.Header2, value);
  }

  copy():PartitionHeader2 {
    return new PartitionHeader2(this.value);
  }
}

export class PartitionHeader3 extends PartitionHeader {
  constructor(value: string) {
    super(PatritionType.Header3, value);
  }

  copy():PartitionHeader3 {
    return new PartitionHeader3(this.value);
  }
}

export class PartitionHeader4 extends PartitionHeader {
  constructor(value: string) {
    super(PatritionType.Header4, value);
  }

  copy():PartitionHeader4 {
    return new PartitionHeader4(this.value);
  }
}

export class PartitionHeader5 extends PartitionHeader {
  constructor(value: string) {
    super(PatritionType.Header5, value);
  }

  copy():PartitionHeader5 {
    return new PartitionHeader5(this.value);
  }
}

export class PartitionHeader6 extends PartitionHeader {
  constructor(value: string) {
    super(PatritionType.Header6, value);
  }

  copy():PartitionHeader6 {
    return new PartitionHeader6(this.value);
  }
}

export class PartitionParagraph extends Partition {
  constructor() {
    super(PatritionType.Paragraph);
  }

  copy():PartitionParagraph {
    return this.setCopyProperties(new PartitionParagraph());
  }
}

export class PartitionText extends Partition {
  constructor() {
    super(PatritionType.Text);
  }

  copy():PartitionText {
    return this.setCopyProperties(new PartitionText());
  }
}

export class PartitionBold extends Partition {
  constructor() {
    super(PatritionType.Bold);
  }

  copy():PartitionParagraph {
    return this.setCopyProperties(new PartitionParagraph());
  }
}

export class PartitionItalics extends Partition {
  constructor() {
    super(PatritionType.Italics);
  }

  copy():PartitionItalics {
    return this.setCopyProperties(new PartitionItalics());
  }
}

export class PartitionQuoteblock extends Partition {
  constructor() {
    super(PatritionType.Quoteblock);
  }

  copy():PartitionQuoteblock {
    return this.setCopyProperties(new PartitionQuoteblock());
  }
}

export class PartitionLink extends Partition {
  link: string;

  constructor(value: string, link: string) {
    super(PatritionType.Link);
    this.value = value;
    this.link = link;
  }

  copy():PartitionLink {
    return new PartitionLink(this.value, this.link);
  }

  json():any {
    return {
      type: this.type,
      value: this.value,
      link: this.link,
    };
  }
}

export class PartitionRelation extends Partition {
  relation: string;

  constructor(value: string, relation: string) {
    super(PatritionType.Relation);
    this.value = value;
    this.relation = relation;
  }

  copy():PartitionRelation {
    return new PartitionRelation(this.value, this.relation);
  }

  json():any {
    return {
      type: this.type,
      value: this.value,
      relation: this.relation,
    };
  }
}

export class PartitionColor extends Partition {
  color: string;

  constructor(value: string, color: string) {
    super(PatritionType.Color);
    this.value = value;
    this.color = color;
  }

  copy():PartitionColor {
    return new PartitionColor(this.value, this.color);
  }

  json():any {
    return {
      type: this.type,
      value: this.value,
      color: this.color,
    };
  }
}

class PartitionList extends Partition {
  items: Partition[];

  constructor(type: PatritionType, items: Partition[]) {
    super(type);
    this.items = items;
  }

  set value(value: string) {
    throw new Error(`cannot set value`);
  }

  set partitions(partitions: Partition[]) {
    throw new Error(`cannot set partitions`);
  }

  json():any {
    return {
      type: this.type,
      items: this.jsonPartitions(this.items)
    }
  }
}

export class PartitionUnorderedList extends PartitionList {
  constructor(items: Partition[]) {
    super(PatritionType.UnorderedList, items);
  }

  copy():PartitionUnorderedList {
    return new PartitionUnorderedList(this.items);
  }
}

export class PartitionOrderedList extends PartitionList {
  constructor(items: Partition[]) {
    super(PatritionType.OrderedList, items);
  }

  copy():PartitionOrderedList {
    return new PartitionOrderedList(this.items);
  }
}

export class PartitionImage extends Partition {
  altText: string;
  link: string;

  constructor(altText: string, link: string) {
    super(PatritionType.Image);
    this.altText = altText;
    this.link = link;
  }

  set value(value: string) {
    throw new Error(`cannot set value`);
  }

  set partitions(partitions: Partition[]) {
    throw new Error(`cannot set partitions`);
  }

  copy():PartitionImage {
    return new PartitionImage(this.altText, this.link);
  }

  json():any {
    return {
      type: this.type,
      altText: this.altText,
      link: this.link,
    }
  }
}

export class PartitionPageBreak extends Partition {
  constructor() {
    super(PatritionType.PageBreak);
  }

  set value(value: string) {
    throw new Error(`cannot set value`);
  }

  set partitions(partitions: Partition[]) {
    throw new Error(`cannot set partitions`);
  }

  copy():PartitionPageBreak {
    return new PartitionPageBreak();
  }

  json():any {
    return {
      type: this.type,
    }
  }
}
