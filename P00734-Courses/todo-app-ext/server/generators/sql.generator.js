
export class SqlGenerator {
  #entityModel

  constructor(entityModel) {
    this.#entityModel = entityModel;
  }

  generateCreateTableSql = () => {
    // validation is completelly skipped

    let tableInfo = this.#entityModel.modelMeta.table;
    let columns = tableInfo.columns;

    let createSentence = `CREATE TABLE IF NOT EXISTS ${tableInfo.name} ( \n`;

    let columnsSentences = columns.map(column => {
      let colStatement = `  ${column.name} ${column.dataType} ${column.isPrimary || ''} ${column.isKey || ''} ${column.keySpec || ''} ${column.nullable || ''}, \n` ;
      colStatement = colStatement.replace(/  +/g, ' ');// replace multiple consecutive whitespaces into one
      return colStatement ;
     })
     .join('');

    let terminator = `) \n`;

    let createTableSql = createSentence + columnsSentences + terminator;

    return createTableSql;
  }

  generateSelectAllPaginatedSql = () => {

  }

  /**
   * `INSERT into Todos (text, isDone, createdDate, changedDate) VALUES (?, ?, ?, ?)`
   */
  generateInsertOneSql = () => {
    let tableInfo = this.#entityModel.modelMeta.table;
    let columns = tableInfo.columns;

    let insertIntoTableSentence = `INSERT into ${tableInfo.name} \n`;
    let insertColumns = '(' + 
      columns.map(column => {
        return column.keySpec === 'AUTOINCREMENT' ? '' : `${column.name}, `
      }).join('').slice(0, -2) 
      + ') \n';
    let insertValues = 'VALUES (' + columns.map(column => column.keySpec === 'AUTOINCREMENT' ? '' : `?, `).join('').slice(0, -2) + ')';

    return insertIntoTableSentence + insertColumns + insertValues;
  }

  generateDeleteOneByIdSql = () => {
    let tableInfo = this.#entityModel.modelMeta.table;
    let deleteOneByIdSql = `DELETE from ${tableInfo.name} WHERE id = ?`

    return deleteOneByIdSql;
  }

  generateUpdateSql = () => {
    
  }
}
