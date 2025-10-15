'use client';

import React, { useState } from 'react';
import { Layout, Row, Col, Typography, Button, Card, Space, Divider } from 'antd';
import { BookOutlined, TrophyOutlined, TeamOutlined, PlayCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

// Navigation Item Component
const NavItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={href} 
      style={{ 
        color: isHovered ? '#1677ff' : '#333', 
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
        padding: '8px 16px',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        backgroundColor: isHovered ? '#f0f6ff' : 'transparent'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
};

// CTA Button Component
const CTAButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button 
      type="primary"
      size="large"
      style={{
        height: '44px',
        padding: '0 24px',
        fontSize: '16px',
        fontWeight: '500',
        borderRadius: '22px',
        backgroundColor: '#1677ff',
        border: 'none',
        boxShadow: isHovered ? '0 8px 20px rgba(22, 119, 255, 0.3)' : '0 4px 12px rgba(22, 119, 255, 0.2)',
        marginLeft: '16px',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0px)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Đặt lịch học
    </Button>
  );
};

export default function Home() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ 
        backgroundColor: '#fff', 
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        padding: '0 60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image 
            src="/logo.svg" 
            alt="English with CiCi" 
            width={160} 
            height={50}
            style={{ height: '50px', width: 'auto' }}
          />
        </div>
        
        {/* Desktop Navigation */}
        <nav style={{ 
          display: 'flex', 
          gap: '48px',
          alignItems: 'center'
        }}>
          <NavItem href="#about">Về chúng tôi</NavItem>
          <NavItem href="#courses">Khóa học</NavItem>
          <NavItem href="#method">Phương pháp học</NavItem>
          <NavItem href="#news">Tin tức</NavItem>
          <NavItem href="#contact">Liên hệ</NavItem>
          
          {/* CTA Button */}
          <CTAButton />
        </nav>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          size="large"
          style={{ 
            fontSize: '20px',
            color: '#333',
            display: 'none'
          }}
          className="mobile-menu-btn"
        >
          ☰
        </Button>
      </Header>

      <Content>
        {/* Hero Section */}
        <section style={{ 
          background: 'linear-gradient(to right, #eff6ff, #e0e7ff)', 
          padding: '80px 0' 
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '0 32px' 
          }}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <div style={{ textAlign: 'center' }}>
                  <Title 
                    level={1} 
                    style={{ 
                      fontSize: '48px', 
                      fontWeight: 'bold', 
                      color: '#1f2937', 
                      marginBottom: '24px',
                      lineHeight: '1.2'
                    }}
                  >
                    Học tiếng Anh hiệu quả với <span style={{ color: '#1677ff' }}>English with CiCi</span>
                  </Title>
                  <Paragraph style={{ 
                    fontSize: '18px', 
                    color: '#6b7280', 
                    marginBottom: '32px',
                    lineHeight: '1.6'
                  }}>
                    Nền tảng học tiếng Anh hiện đại với phương pháp học tương tác, 
                    cá nhân hóa và hiệu quả. Cùng CiCi chinh phục tiếng Anh từ cơ bản đến nâng cao.
                  </Paragraph>
                  <Space size="large" wrap>
                    <Button 
                      type="primary" 
                      size="large" 
                      icon={<BookOutlined />}
                      style={{ 
                        height: '48px', 
                        padding: '0 32px', 
                        fontSize: '16px', 
                        fontWeight: '500' 
                      }}
                    >
                      Bắt đầu học ngay
                    </Button>
                    <Button 
                      size="large"
                      icon={<PlayCircleOutlined />}
                      style={{ 
                        height: '48px', 
                        padding: '0 32px', 
                        fontSize: '16px' 
                      }}
                    >
                      Xem video giới thiệu
                    </Button>
                  </Space>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    backgroundColor: '#fff', 
                    padding: '32px', 
                    borderRadius: '16px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                  }}>
                    <BookOutlined style={{ 
                      fontSize: '64px', 
                      color: '#1677ff', 
                      marginBottom: '16px',
                      display: 'block'
                    }} />
                    <Title level={3} style={{ color: '#1f2937', marginBottom: '8px' }}>
                      Học thông minh, tiến bộ nhanh
                    </Title>
                    <Text style={{ color: '#6b7280', fontSize: '16px' }}>
                      Công nghệ AI hỗ trợ học tập cá nhân hóa
                    </Text>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{ padding: '80px 0', backgroundColor: '#fff' }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '0 32px' 
          }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <Title 
                level={2} 
                style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold', 
                  color: '#1f2937', 
                  marginBottom: '16px' 
                }}
              >
                Không gian học tập hiện đại, thân thiện với công nghệ tiên tiến
              </Title>
              <Paragraph style={{ 
                fontSize: '18px', 
                color: '#6b7280', 
                maxWidth: '768px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                English with CiCi là nền tảng học tiếng Anh hiện đại, chuyên sâu trong lĩnh vực 
                giảng dạy tiếng Anh giao tiếp, ngữ pháp và kỹ năng học tập. Với sứ mệnh giúp học viên 
                nắm vững tiếng Anh một cách tự nhiên và hiệu quả.
              </Paragraph>
            </div>

            <Row gutter={[32, 32]} justify="center">
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    backgroundColor: '#dbeafe', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px' 
                  }}>
                    <BookOutlined style={{ fontSize: '24px', color: '#1677ff' }} />
                  </div>
                  <Title level={4} style={{ color: '#1f2937', marginBottom: '12px' }}>
                    Phương pháp học tương tác
                  </Title>
                  <Text style={{ color: '#6b7280' }}>
                    Học thông qua trò chơi, video và bài tập tương tác thú vị
                  </Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    backgroundColor: '#dcfce7', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px' 
                  }}>
                    <TeamOutlined style={{ fontSize: '24px', color: '#16a34a' }} />
                  </div>
                  <Title level={4} style={{ color: '#1f2937', marginBottom: '12px' }}>
                    Giáo viên chuyên nghiệp
                  </Title>
                  <Text style={{ color: '#6b7280' }}>
                    Đội ngũ giáo viên giàu kinh nghiệm và tận tâm với học viên
                  </Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    backgroundColor: '#f3e8ff', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px' 
                  }}>
                    <TrophyOutlined style={{ fontSize: '24px', color: '#9333ea' }} />
                  </div>
                  <Title level={4} style={{ color: '#1f2937', marginBottom: '12px' }}>
                    Theo dõi tiến độ
                  </Title>
                  <Text style={{ color: '#6b7280' }}>
                    Hệ thống theo dõi tiến độ chi tiết và chứng chỉ hoàn thành
                  </Text>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '80px 0', backgroundColor: '#f9fafb' }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '0 32px' 
          }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <Title 
                level={2} 
                style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold', 
                  color: '#1f2937', 
                  marginBottom: '16px' 
                }}
              >
                English with CiCi chú trọng nâng cao trải nghiệm học tập
              </Title>
              <Paragraph style={{ 
                fontSize: '18px', 
                color: '#6b7280', 
                maxWidth: '768px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Không chỉ chú trọng phương pháp giảng dạy, English with CiCi còn đầu tư vào 
                nền tảng công nghệ hiện đại, tiện nghi và thân thiện với người dùng.
              </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={6}>
                <Card 
                  style={{ 
                    textAlign: 'center', 
                    height: '100%', 
                    border: 'none', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)' 
                  }}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: '#dbeafe', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px' 
                  }}>
                    <BookOutlined style={{ fontSize: '20px', color: '#1677ff' }} />
                  </div>
                  <Title level={5} style={{ color: '#1f2937', marginBottom: '8px' }}>
                    Giao diện thân thiện
                  </Title>
                  <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                    Thiết kế hiện đại, dễ sử dụng
                  </Text>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card 
                  style={{ 
                    textAlign: 'center', 
                    height: '100%', 
                    border: 'none', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)' 
                  }}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: '#dcfce7', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px' 
                  }}>
                    <TrophyOutlined style={{ fontSize: '20px', color: '#16a34a' }} />
                  </div>
                  <Title level={5} style={{ color: '#1f2937', marginBottom: '8px' }}>
                    Hệ thống học tập chính xác
                  </Title>
                  <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                    Đánh giá và phản hồi tức thì
                  </Text>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card 
                  style={{ 
                    textAlign: 'center', 
                    height: '100%', 
                    border: 'none', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)' 
                  }}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: '#f3e8ff', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px' 
                  }}>
                    <TeamOutlined style={{ fontSize: '20px', color: '#9333ea' }} />
                  </div>
                  <Title level={5} style={{ color: '#1f2937', marginBottom: '8px' }}>
                    Tư vấn học tập chuyên sâu
                  </Title>
                  <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                    Hỗ trợ 1-1 từ giáo viên
                  </Text>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card 
                  style={{ 
                    textAlign: 'center', 
                    height: '100%', 
                    border: 'none', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)' 
                  }}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: '#fed7aa', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px' 
                  }}>
                    <PlayCircleOutlined style={{ fontSize: '20px', color: '#ea580c' }} />
                  </div>
                  <Title level={5} style={{ color: '#1f2937', marginBottom: '8px' }}>
                    Quy trình học tập khép kín
                  </Title>
                  <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                    Từ cơ bản đến nâng cao
                  </Text>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '80px 0', backgroundColor: '#1677ff' }}>
          <div style={{ 
            maxWidth: '1024px', 
            margin: '0 auto', 
            padding: '0 32px', 
            textAlign: 'center' 
          }}>
            <Title 
              level={2} 
              style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#fff', 
                marginBottom: '24px' 
              }}
            >
              English with CiCi không ngừng nghiên cứu và đổi mới
            </Title>
            <Paragraph style={{ 
              fontSize: '18px', 
              color: '#bfdbfe', 
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Đối với chúng tôi, mỗi bước tiến trong phương pháp giảng dạy là nền tảng để mang đến 
              giải pháp học tiếng Anh hiệu quả và cá nhân hóa cho từng học viên.
            </Paragraph>
            <Button 
              type="default" 
              size="large" 
              style={{ 
                height: '48px', 
                padding: '0 32px', 
                fontSize: '16px', 
                fontWeight: '500',
                backgroundColor: '#fff',
                color: '#1677ff',
                border: 'none'
              }}
            >
              Bắt đầu học thử miễn phí
            </Button>
          </div>
        </section>
      </Content>

      {/* Footer */}
      <Footer style={{ backgroundColor: '#111827', color: '#d1d5db' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '48px 32px' 
        }}>
          <Row gutter={[48, 32]}>
            <Col xs={24} md={8}>
              <Image 
                src="/logo.svg" 
                alt="English with CiCi" 
                width={140} 
                height={45}
                style={{ 
                  height: '45px', 
                  width: 'auto', 
                  marginBottom: '16px',
                  filter: 'brightness(0) invert(1)'
                }}
              />
              <Paragraph style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                Nền tảng học tiếng Anh hiện đại và hiệu quả, 
                giúp bạn chinh phục tiếng Anh một cách tự nhiên.
              </Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>
                Liên kết nhanh
              </Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#about" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                  Về chúng tôi
                </a>
                <a href="#courses" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                  Khóa học
                </a>
                <a href="#contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                  Liên hệ
                </a>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <Title level={5} style={{ color: '#fff', marginBottom: '16px' }}>
                Liên hệ
              </Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#9ca3af' }}>
                <div>Email: contact@englishwithcici.com</div>
                <div>Hotline: 1900 xxx xxx</div>
                <div>Địa chỉ: TP. Hồ Chí Minh</div>
              </div>
            </Col>
          </Row>
          <Divider style={{ borderColor: '#374151', margin: '32px 0' }} />
          <div style={{ textAlign: 'center', color: '#6b7280' }}>
            © 2025 English with CiCi. Đã đăng ký bản quyền.
          </div>
        </div>
      </Footer>
    </Layout>
  );
}
