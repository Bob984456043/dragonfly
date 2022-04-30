export function walk(root: API.SideBarNode,f: Function){
  if (!root){
    return
  }
  f(root)
  root?.children?.map((node)=>{
    walk(node,f)
  })
}
