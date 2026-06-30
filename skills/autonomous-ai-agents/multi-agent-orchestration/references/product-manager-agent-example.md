# Product Manager Agent Example

A specialized sub-agent for client requirement gathering, PRD writing, and dev team handoff.

## Directory Structure

```
product-manager-agent/
├── agent-config.yaml          # Main config
├── README.md                  # Detailed usage guide
├── QUICK_START.md             # Quick reference
├── start.sh                   # Interactive menu script
├── documents/
│   ├── prd/                   # Product Requirement Docs
│   ├── user-stories/          # User stories
│   ├── specifications/        # Functional specs
│   └── reports/               # Project reports
├── templates/
│   ├── prd-template.md        # PRD template
│   ├── user-story-template.md # User story template
│   └── specification-template.md # Spec template
├── data/
│   ├── clients/               # Client info
│   ├── projects/              # Project data
│   └── requirements/          # Requirement records
└── communication/
    ├── meetings/              # Meeting notes
    ├── emails/                # Email records
    └── feedback/              # Client feedback
```

## agent-config.yaml Key Sections

```yaml
name: product-manager-agent
description: 对接客户需求、明确开发内容并协调开发团队的产品经理代理
version: 1.0.0

responsibilities:
  - 客户需求收集和分析
  - 产品需求文档(PRD)编写
  - 功能规格说明和优先级排序
  - 开发任务分解和分配
  - 项目进度跟踪和协调
  - 客户沟通和需求确认

skills:
  - 需求分析与管理
  - 产品规划与设计
  - 项目管理与协调
  - 客户沟通与关系维护
  - 文档编写与维护
  - 敏捷开发流程管理

workflows:
  requirement_collection:
    1. 客户初步沟通
    2. 需求调研和访谈
    3. 需求整理和分类
    4. 需求可行性评估
    5. 需求优先级排序
    6. 需求文档编写
    7. 客户确认和签字

  product_design:
    1. 产品功能规划
    2. 用户故事编写
    3. 功能规格说明
    4. 原型设计协调
    5. 技术方案评审
    6. 设计文档输出
    7. 开发团队交接

config:
  docs_path: "./documents"
  template_path: "./templates"
  data_path: "./data"
  communication_path: "./communication"
```

## start.sh Interactive Menu Pattern

The start script provides a menu-driven interface for common operations:

```bash
#!/bin/bash
echo "========================================="
echo "  产品经理分身 (Product Manager Agent)"
echo "========================================="
echo ""
echo "请选择操作:"
echo "1. 查看使用指南"
echo "2. 查看配置文件"
echo "3. 创建新客户需求"
echo "4. 编写PRD文档"
echo "5. 编写用户故事"
echo "6. 编写功能规格"
echo "7. 查看项目状态"
echo "8. 退出"
echo ""
read -p "请输入选项 (1-8): " choice

case $choice in
    1) cat README.md | less ;;
    2) cat agent-config.yaml | less ;;
    3) # Create requirement record
       read -p "客户名称: " client_name
       read -p "需求标题: " req_title
       # ... create file in data/requirements/ ;;
    4) # Copy PRD template to documents/prd/
       cp templates/prd-template.md documents/prd/$(date +%Y%m%d_%H%M%S)_prd.md ;;
    # ... etc
esac
```

## Chinese PM Document Templates

### PRD Template Structure
1. 产品概述 (背景/目标/用户/范围)
2. 需求详述 (功能需求/非功能需求/用户故事)
3. 设计规范 (信息架构/交互/界面)
4. 技术要求 (架构/数据/接口/部署)
5. 项目计划 (里程碑/资源/风险)
6. 验收标准 (功能/性能/用户验收)
7. 审批签字

### User Story Template
```
作为 [用户角色]，我想要 [功能描述]，以便 [业务价值]。
```
Includes: 验收标准, 功能要求, 交互设计, 技术要求, 测试用例, 依赖关系, 估算与计划

### Functional Specification Template
功能列表 → 功能流程 → 功能规则 → 界面设计 → 数据设计 → 接口设计 → 技术实现 → 测试要求 → 部署运维

## Integration with Master Registry

When creating a new agent, update `~/sub-agent-management-guide.md`:

```markdown
### N. [Agent Role] Sub Agent
- **名称**: [agent-name]
- **位置**: `/home/dmql/[agent-name]/`
- **功能**:
  - [Function 1]
  - [Function 2]
- **配置文件**: `agent-config.yaml`
- **使用指南**: `README.md`
```

Also update the "启动 Sub Agent" and "协同工作示例" sections.
