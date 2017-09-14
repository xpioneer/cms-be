/*qinfeng*/

import DB from '../models'

const Article = DB.Article;

class ArticleService {

	static async getById (id) {
		const article = await Article.findById(id);
		return article;
	}

	static async pages (params) {
		const pages = await Article.findAndCountAll(params);
		return pages;
	}

	static async insert (model) {
		const result = await Article.insert(model);
		return result;
	}

	// static async update (model) {
	// 	const result = await Article.update(model);
	// 	return result;
	// }

	// //更新状态删除
	// static async delete (id) {
	// 	const result = await Article.delete(id);
	// 	return result;
	// }

}

export default ArticleService;