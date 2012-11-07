//抽象構文木のすべてのクラスはASTreeのサブクラス
//
//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr


var ASTree = function(){
	//抽象クラス
	//サブクラスのASTLeafとASTListが上書きして実装
	//
	//ASTLeaf child(int i);
	//int numChildren();
	//Iterator<ASTree> child();
	//String location();
	//Iterator<ASTree> iterator(){ return children(); }
	
};


