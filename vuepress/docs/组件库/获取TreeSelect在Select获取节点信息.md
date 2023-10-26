获取TreeSelect在Select获取节点信息

~~~js
 onSelect = (value, node) => {
    const attachmentList = node?.node?.props?.dataRef?.attachmentList || [];
    const selectImageType = node?.node?.props?.dataRef || {}; //treeSelect树获取node节点， dataRef在下面树中
 }
 
~~~

~~~js
<TreeNode
            key={image.nodeCode}
            title={
              <>
                {image.nodeName}
                {!!count && <span style={{ float: 'right' }}>{count}</span>}
              </>
            }
            dataRef={image}
            icon={<Icon type="folder-open" />}
          >
            {this.renderApprovalGroupTree(image.children, floors + 1, extra)}
          </TreeNode>
~~~

