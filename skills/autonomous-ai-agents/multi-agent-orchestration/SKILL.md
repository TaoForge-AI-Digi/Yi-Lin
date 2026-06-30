---
name: multi-agent-orchestration
description: "Manage and coordinate multiple specialized sub agents for complex, multi-domain tasks"
version: 1.0.0
tags: [多智能体, 编排, 开发]
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [multi-agent, orchestration, coordination, delegation, specialization]
    homepage: https://github.com/NousResearch/hermes-agent
    related_skills: [autonomous-ai-agents, delegation, task-planning]
---

# Multi-Agent Orchestration

This skill provides a comprehensive framework for managing multiple specialized sub agents to handle complex, multi-domain tasks efficiently.

## Core Principles

### 1. Specialization Over Generalization
- Each agent should focus on a specific domain (knowledge management, finance, creative writing)
- Agents develop deep expertise in their designated area
- Avoid creating "jack-of-all-trades" agents that lack specialization

### 2. Clear Role Definition
- Define explicit responsibilities and boundaries for each agent
- Ensure no overlap in core competencies
- Establish clear escalation paths for cross-domain issues

### 3. Independent Yet Collaborative
- Agents should be able to work independently
- Establish protocols for inter-agent communication and collaboration
- Implement task handoff mechanisms between agents

## Agent Configuration Framework

### Domain-Specific Agent Structure
```
agent-name/
├── agent-config.yaml     # Core configuration and responsibilities
├── workflows/           # Domain-specific workflows
├── templates/           # Templates and examples
├── data/               # Storage for domain data
├── scripts/            # Domain-specific scripts
└── references/         # Domain knowledge and best practices
```

### Configuration Template
```yaml
name: [agent-name]
description: [Clear domain-specific description]
version: 1.0.0

# Core responsibilities
responsibilities:
  - [Specific responsibility 1]
  - [Specific responsibility 2]
  - [Specific responsibility 3]

# Skills and competencies
skills:
  - [Skill 1]
  - [Skill 2]
  - [Skill 3]

# Required tools
tools:
  - [tool 1]
  - [tool 2]
  - [tool 3]

# Workflows
workflows:
  [workflow_name]:
    - Step 1
    - Step 2
    - Step 3
```

## Common Agent Types

### 1. Knowledge Management Agent
- **Focus**: Document organization, search, knowledge discovery
- **Tools**: Obsidian, file management, search capabilities
- **Skills**: Categorization, tagging, relationship mapping

### 2. Business Process Agent
- **Focus**: Quotations, contracts, client management
- **Tools**: Template management, data tracking, reporting
- **Skills**: Business logic, document generation, workflow management

### 3. Creative Agent
- **Focus**: Content creation, editing, optimization
- **Tools**: Writing tools, version control, feedback systems
- **Skills**: Story structure, character development, style refinement

### 4. Product Manager Agent
- **Focus**: Client requirements, PRD writing, dev team handoff
- **Tools**: Document templates, requirement tracking, client communication
- **Skills**: Requirement analysis, user story writing, functional specification, project coordination
- **Key pattern**: Interactive `start.sh` menu for non-technical PM workflows

## Orchestration Strategies

### 1. Sequential Task Processing
```
Task → Agent 1 → Agent 2 → Agent 3 → Completion
```
- Best for linear workflows with clear dependencies
- Example: Quotation → Contract → Project tracking

### 2. Parallel Task Processing
```
Task → [Agent 1, Agent 2, Agent 3] → Integration
```
- Best for independent tasks that can run concurrently
- Example: Knowledge organization, client management, content creation

### 3. Hybrid Approach
```
Main Agent → Sub-task delegation → Integration → Final output
```
- Best for complex tasks requiring both specialization and coordination
- Example: Project management with domain-specific sub-tasks

## Implementation Patterns

### 1. Agent Initialization
```bash
# Create agent directory structure
mkdir -p agent-name/{workflows,templates,data,scripts,references,documents,communication}

# Generate configuration
cat > agent-name/agent-config.yaml << EOF
[name and config details]
EOF
```

### 1b. Interactive Menu Script (start.sh)
For non-technical users, create a `start.sh` with a numbered menu:
```bash
#!/bin/bash
echo "请选择操作:"
echo "1. 查看使用指南"
echo "2. 创建新[核心对象]"
echo "3. 编写[核心文档]"
echo "4. 查看项目状态"
echo "5. 退出"
read -p "请输入选项: " choice
case $choice in
    1) cat README.md | less ;;
    2) # Interactive creation flow ;;
    3) # Copy template and prompt ;;
    4) # List data directory ;;
esac
```

### 2. Task Delegation
```python
# Pattern for delegating to specialized agents
def delegate_to_specialist(domain, task):
    specialist_agent = load_agent(domain)
    return specialist_agent.execute(task)
```

### 3. Result Integration
```python
# Pattern for combining results from multiple agents
def integrate_results(results):
    # Merge, deduplicate, and format results
    # Handle conflicts and inconsistencies
    # Return unified output
```

## Best Practices

### 1. Resource Management
- Monitor agent resource usage (CPU, memory, API calls)
- Implement load balancing for concurrent agents
- Set appropriate timeouts for different task types

### 2. Error Handling
- Implement comprehensive error logging for each agent
- Create fallback mechanisms for failed tasks
- Establish recovery procedures for partial failures

### 3. Performance Optimization
- Cache results where appropriate
- Implement async processing for long-running tasks
- Use batching for similar operations

### 4. Security and Privacy
- Isolate sensitive data between agents
- Implement proper access controls
- Ensure audit logging for compliance

## Pitfalls to Avoid

### 1. Over-Engineering
- **Problem**: Creating too many specialized agents for simple tasks
- **Solution**: Start with 2-3 key agents and expand as needed
- **Detection**: Tasks take longer due to agent coordination overhead

### 2. Communication Overhead
- **Problem**: Agents spend too much time communicating instead of working
- **Solution**: Design clear, efficient communication protocols
- **Detection**: High latency between task initiation and completion

### 3. Resource Contention
- **Problem**: Multiple agents competing for the same resources
- **Solution**: Implement proper resource allocation and prioritization
- **Detection**: Slow performance or timeouts during concurrent operations

### 4. Knowledge Silos
- **Problem**: Agents lack visibility into each other's work
- **Solution**: Implement shared knowledge bases and status reporting
- **Detection**: Inconsistent outputs or redundant work

### 5. Missing Master Registry
- **Problem**: No central index of all agents; hard to remember what exists
- **Solution**: Maintain a `~/sub-agent-management-guide.md` as the single source of truth
- **Detection**: User asks "what agents do we have?" or you create duplicate agents
- **Update rule**: Every time you create a new agent, update the master registry with:
  1. Agent name, location, and functions
  2. Config file and guide references
  3. Add to "启动 Sub Agent" section
  4. Add to "协同工作示例" workflow

## Quality Assurance

### 1. Agent Testing
- Test each agent independently
- Test agent integration points
- Validate end-to-end workflows

### 2. Performance Monitoring
- Track response times and success rates
- Monitor resource utilization
- Identify bottlenecks and optimize

### 3. Continuous Improvement
- Gather feedback on agent performance
- Update configurations based on usage patterns
- Refine workflows as needs evolve

## Example Implementation

### Knowledge Management Agent
```yaml
name: knowledge-base-agent
description: Specialized agent for document organization and knowledge discovery
responsibilities:
  - Document categorization and tagging
  - Knowledge graph construction
  - Search and retrieval optimization
  - Content relationship mapping
```

### Business Process Agent
```yaml
name: finance-agent
description: Specialized agent for business document generation and tracking
responsibilities:
  - Quotation and contract generation
  - Client relationship management
  - Project tracking and reporting
  - Business logic enforcement
```

### Creative Agent
```yaml
name: writing-agent
description: Specialized agent for content creation and optimization
responsibilities:
  - Story structure and character development
  - Content editing and refinement
  - Style consistency and quality control
  - Creative process management
```

This framework provides a systematic approach to managing multiple specialized agents while maintaining efficiency and quality across complex, multi-domain tasks.

## Support Files

### References
- **[specialized-agents-examples.md](references/specialized-agents-examples.md)**: Concrete examples of specialized agents for knowledge management, finance, and creative writing domains, based on real implementations
- **[product-manager-agent-example.md](references/product-manager-agent-example.md)**: Product manager agent example with Chinese PM workflow, interactive menu pattern, PRD/user-story/spec templates, and master registry integration

### Scripts
- **[create-agent.sh](scripts/create-agent.sh)**: Setup script for creating new specialized agents with proper directory structure, configuration files, and templates

### Templates
- Configuration templates for different agent types
- Workflow templates and examples
- Quality assurance checklists and procedures

## Quick Start

1. **Create a new agent**:
   ```bash
   ./scripts/create-agent.sh <agent-name> <domain> [description]
   ```

2. **Configure your agent** by editing the generated `agent-config.yaml`

3. **Define workflows** in the `workflows/` directory

4. **Use templates** from the `templates/` directory

5. **Initialize and run** the agent using the setup script
