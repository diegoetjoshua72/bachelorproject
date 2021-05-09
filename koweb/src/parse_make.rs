use log::{info, trace, warn, Level};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

static make_text: &str =
    "solve_easy.dko: solve_easy.dk sudoku.dko test.dko blabla.dko lotsofchild.dk

stuf: test.dk blabla.dk ../bool.dk

stuf: blabla.dk sudoku.dk

lotsofchild: lotsofchild.dk test.dk blabla.dk sudoku.dk ../bool.dk bool.dk

../bool.dko: ../bool.dk

sudoku.dko: sudoku.dk ../bool.dko";

static make_text_2: &str = "solve_easy.dko: solve_easy.dk sudoku.dko

../bool.dko: ../bool.dk

sudoku.dko: sudoku.dk ../bool.dko";

#[derive(Debug)]
struct Graph {
    graph: Vec<Node>,
}

#[derive(Debug)]
struct Node {
    index: usize,
    data: String,
    children: Vec<usize>, // vector of indices
}
impl Node {
    fn new(index: usize, data: String) -> Self {
        Node {
            index,
            data,
            children: vec![],
        }
    }
}

fn remove_dup(vec: Vec<String>) -> Vec<String> {
    let mut result = vec![];
    for elem in vec {
        if !result.contains(&elem) {
            result.push(elem);
        }
    }
    result
}

impl Graph {
    fn get_all_children(&self, index: usize) -> Option<Vec<usize>> {
        let mut result = vec![];
        // info!("get all children graph : {:?}", self.graph);
        for child_idx in self.graph[index].children.clone() {
            if self.get_index_node_with_value(self.graph[child_idx].data.clone()) != None {
                if self.graph[child_idx].children.len() != 0 {
                    match self.get_all_children(child_idx) {
                        Some(mut deps) => {
                            for dep in deps {
                                if !result.contains(&dep) {
                                    result.push(dep)
                                }
                            }
                            result.push(child_idx); //test
                        }
                        None => result.push(child_idx),
                    }
                } else {
                    result.push(child_idx);
                }
            } else {
                panic!(
                    "syntax error in the make file at : {}",
                    self.graph[child_idx].data.clone()
                )
            }
        }

        //first thing should be sudoku.dk
        //here we should get sudoku.dk , bool.dk
        // println!("RECURSION {:?} :: {:?}", self.graph[index].data, result);
        // info!("recursion");
        Some(result)
    }

    fn get_full_dependency_path_inorder(&self, val: String) -> Option<Vec<String>> {
        if self.get_index_node_with_value(val.clone()) == None {
            return None;
        }
        let mut dep_order: Vec<String> = vec![];

        for node in &self.graph {
            if node.data == val {
                for child_node in node.children.clone() {
                    for child in self.get_all_children(child_node).unwrap() {
                        dep_order.push(self.graph[child].data.clone());
                    }
                    dep_order.push(self.graph[child_node].data.clone());
                }
                dep_order.push(node.data.clone());

                // println!("-------------------------------");
                // println!("FULL DEP :: {:?}", dep_order);

                let dep_order_no_dup = remove_dup(dep_order);
                // println!("FUll DEP NO DUP :: {:?}", dep_order_no_dup);
                return Some(dep_order_no_dup);
            }
        }
        None
    }

    fn get_all_dependencies(&self, index: usize) -> (String, Vec<String>) {
        let node_name = self.graph[index].data.clone();

        let mut deps: Vec<String> = vec![];
        for child_index in self.graph[index].children.clone() {
            deps.push(self.graph[child_index].data.clone());
        }

        (node_name, deps)
    }

    fn get_index_node_with_value(&self, val: String) -> Option<usize> {
        for node in &self.graph {
            if node.data == val {
                return Some(node.index);
            }
        }
        None
    }

    fn add_node(&mut self, data: String, parent_index: Option<usize>) -> usize {
        let new_index = self.graph.len();
        match parent_index {
            //modify the node at that index and add a child
            Some(index) => {
                //modify node at index
                self.graph[index].children.push(new_index);
                self.graph.push(Node::new(new_index, data))
            }

            None => self.graph.push(Node::new(new_index, data)),
        };
        new_index
    }

    //next
    fn print_graph(&self) {
        for i in 0..self.graph.len() {
            println!("{} :: {:?}", i, self.get_all_dependencies(i));
        }
    }
}

fn create_graph(make_text_js: String) -> Graph {
    let mut graph = Graph { graph: vec![] };
    let mut files = vec![];
    let line_iter = make_text_js.lines();
    for line in line_iter {
        if line != "" {
            let mut temp = line.split(' ');
            temp.next();
            let mut result = vec![];
            for x in temp {
                if x != "" {
                    result.push(x);
                }
            }
            files.push(result);

            // files.push(temp.collect::<Vec<&str>>());
        }
    }
    // info!("create_graph : files (before o removal): {:?}", &files);

    for i in 0..files.len() {
        for j in 0..files[i].len() {
            if files[i][j].contains(".dko") {
                files[i][j] = &files[i][j][0..files[i][j].len() - 1];
            }
        }
    }
    // info!("create_graph : files (after o removal): {:?}", &files);

    for i in 0..files.len() {
        for j in 0..files[i].len() {
            if j == 0 {
                if graph.get_index_node_with_value(String::from(files[i][j])) == None {
                    graph.add_node(String::from(files[i][j]), None);
                }
            } else {
                // if graph.get_index_node_with_value(String::from(files[i][j])) == None {
                let index_first = graph.get_index_node_with_value(String::from(files[i][0]));
                if graph.get_index_node_with_value(String::from(files[i][j])) == None {
                    graph.add_node(String::from(files[i][j]), index_first);
                } else {
                    let index_child = graph
                        .get_index_node_with_value(String::from(files[i][j]))
                        .unwrap();
                    graph.graph[index_first.unwrap()].children.push(index_child);
                }
            }
        }
    }

    return graph;
}

#[derive(Serialize, Deserialize)]
pub struct Output {
    // pub name: String,
    pub full_dep: Vec<(String, Vec<String>)>,
}

#[wasm_bindgen]
pub fn get_graph_rust(make_text_js: String) -> JsValue {
    let graph = create_graph(make_text_js);
    //dependencies looking good
    let mut vec_names = vec![];
    for node in &graph.graph {
        if !vec_names.contains(&node.data) {
            vec_names.push(node.data.clone());
        }
    }

    let mut output = vec![];
    // info!("NAME VEC : {:?}", &vec_names);
    for name in &vec_names {
        output.push((
            name.clone(),
            graph
                .get_full_dependency_path_inorder(String::from(name))
                .unwrap(),
        ));
    }

    // graph.print_graph();
    info!("GRAPH : {:?}", graph);
    info!("VEC_NAME : {:?}", &vec_names);
    info!("FINAL OUTPUT SENT TO JS : {:?}", output);
    JsValue::from_serde(&output).unwrap()
}

//possible to look into
fn check_self_dependence() {
    ();
}
fn check_loops() {
    ();
}

// #[test]
// fn testing_parse() {
//     // create_graph(make_text.to_string());
//     get_graph_rust(make_text.to_string());
// }

//check for loops in dependency graph and just ignore them
//
