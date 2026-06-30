# Specialized Agent Examples

This document provides concrete examples of specialized agents created for common use cases, based on real implementations.

## Agent Implementations

### 1. Knowledge Base Management Agent

**Configuration**: `/home/dmql/knowledge-base-agent/agent-config.yaml`
```yaml
name: knowledge-base-agent
description: Specialized agent for document organization and knowledge discovery
responsibilities:
  - Document categorization and tagging
  - Knowledge graph construction
  - Search and retrieval optimization
  - Content relationship mapping
```

**Key Features**:
- Uses Obsidian as core knowledge management tool
- Supports multiple document formats (company files, personal notes, references)
- Implements intelligent categorization and tagging
- Builds knowledge graphs for content relationships
- Provides search and query capabilities

**Implementation Details**:
- **Template Path**: `./templates/`
- **Output Path**: `./output/`
- **Data Path**: `./data/`
- **Backup**: Daily automated backups
- **Plugins**: Kanban, Dataview, Calendar, Excalidraw

**Best Practices**:
- Use consistent naming conventions for documents
- Implement hierarchical folder structures
- Regular maintenance and cleanup
- Regular backup and synchronization

### 2. Financial Management Agent

**Configuration**: `/home/dmql/finance-agent/agent-config.yaml`
```yaml
name: finance-agent
description: Specialized agent for business document generation and tracking
responsibilities:
  - Quotation and contract generation
  - Client relationship management
  - Project tracking and reporting
  - Business logic enforcement
```

**Key Features**:
- Manages quotation and contract templates
- Tracks client information and project status
- Handles pricing strategies and cost analysis
- Generates business reports and analytics

**Implementation Details**:
- **Template Path**: `./templates/`
- **Output Path**: `./output/`
- **Data Path**: `./data/`
- **Access Control**: Role-based permissions
- **Backup**: Automated daily backups

**Data Structures**:
- **Customer**: Basic info, contact details, project history, payment records, credit rating
- **Project**: Project details, budget, timeline, deliverables, status tracking
- **Quotation**: Quotation ID, customer info, project description, pricing, validity, acceptance status
- **Contract**: Contract ID, parties involved, project scope, payment terms, delivery timeline, breach clauses

### 3. Creative Writing Agent

**Configuration**: `/home/dmql/writing-agent/agent-config.yaml`
```yaml
name: writing-agent
description: Specialized agent for content creation and optimization
responsibilities:
  - Story structure and character development
  - Content editing and refinement
  - Style consistency and quality control
  - Creative process management
```

**Key Features**:
- Specialized in BDSM theme creative writing
- Emphasizes artistic boundaries and quality standards
- Supports both new creation and rewriting workflows
- Implements version control and creative process management

**Implementation Details**:
- **Environment**: Writing software configuration, file organization, version control
- **Quality Control**: Self-check lists, modification standards, review processes
- **Character Building**: Avoids stereotypes, emphasizes psychological depth, shows development
- **Plot Design**: Logical consistency, rhythm control, suspense building, satisfaction

**Creative Principles**:
- **Boundary Principles**: Respect personal choice and consent, avoid non-violent descriptions, focus on emotional depth
- **Quality Standards**: Plot coherence, character depth, natural dialogue, vivid descriptions, thematic depth

## Implementation Patterns

### Agent Directory Structure
```
agent-name/
├── agent-config.yaml     # Core configuration
├── workflows/           # Domain-specific workflows
├── templates/           # Templates and examples
├── data/               # Storage for domain data
├── scripts/            # Domain-specific scripts
└── references/         # Domain knowledge
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

# Skills and competencies
skills:
  - [Skill 1]
  - [Skill 2]

# Required tools
tools:
  - [tool 1]
  - [tool 2]

# Workflows
workflows:
  [workflow_name]:
    - Step 1
    - Step 2
```

## Setup Script

```bash
#!/bin/bash
# Create a new specialized agent

AGENT_NAME=$1
AGENT_DOMAIN=$2

mkdir -p $AGENT_NAME/{workflows,templates,data,scripts,references}
cat > $AGENT_NAME/agent-config.yaml << EOF
name: $AGENT_NAME
description: Specialized agent for $AGENT_DOMAIN tasks
version: 1.0.0

responsibilities:
  - Domain-specific task 1
  - Domain-specific task 2
  - Domain-specific task 3

skills:
  - Skill 1
  - Skill 2
  - Skill 3

tools:
  - tool 1
  - tool 2
  - tool 3

workflows:
  main_workflow:
    - Step 1
    - Step 2
    - Step 3

config:
  template_path: "./templates"
  output_path: "./output"
  data_path: "./data"
  backup_enabled: true
EOF

echo "Created agent: $AGENT_NAME for $AGENT_DOMAIN domain"
```

## Integration Patterns

### Sequential Processing
```
Task → Knowledge Agent → Finance Agent → Writing Agent → Completion
```

### Parallel Processing
```
Task → [Knowledge Agent, Finance Agent, Writing Agent] → Integration
```

### Hybrid Approach
```
Main Coordinator → Sub-agent Delegation → Integration → Final Output
```

## Quality Metrics

### Knowledge Base Agent
- Document organization efficiency
- Search accuracy and speed
- Knowledge graph completeness
- User satisfaction with retrieval

### Finance Agent
- Document generation accuracy
- Client relationship management
- Project tracking reliability
- Business process efficiency

### Writing Agent
- Content quality scores
- Creative process efficiency
- Version control accuracy
- User satisfaction with output

## Monitoring and Maintenance

### Performance Monitoring
- Track response times for each agent
- Monitor resource utilization
- Identify bottlenecks and optimize
- Regular performance reviews

### Error Handling
- Comprehensive error logging
- Fallback mechanisms for failed tasks
- Recovery procedures for partial failures
- Continuous improvement based on error patterns

### Updates and Maintenance
- Regular configuration reviews
- Template updates based on usage patterns
- Workflow refinements
- Performance optimization
